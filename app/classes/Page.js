// Nodes modules
import GSAP from 'gsap'
import Prefix from 'prefix'
import NormalizeWheel from 'normalize-wheel'
import each from 'lodash/each'
import map from 'lodash/map'
// Animations
import Title from '../animations/Titles'
import GallerySection from '../animations/GallerySection'
import Paragraph from '../animations/Paragraph'
import Label from '../animations/Label'
import Images from '../animations/Images'
import Link from '../animations/Link'
// Classes
import { ColorsManager } from './Colors'
import AsyncLoad from './AsyncLoad'
// Classe
export default class Page {
  constructor ({
    _element,
    _elements,
    _id
  })
  {
    this.selector = _element
    this.selectorChildren =
    {
      ..._elements,
      animationsTitle: '[data-animation="title"]',
      animationsGallerySection: '[data-animation="gallery-section"]',
      animationsParagraph: '[data-animation="paragraph"]',
      animationsLabel: '[data-animation="label"]',
      animationsLink: '[data-animation="link"]',
      preloaders: '[data-src]',
    }

    this.id = _id
    this.transformPrefix = Prefix('transform')

    this.params =
    {
      duration: '1000', // Scroll duration
      timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)', // Timingfunction
    }

    this.onMouseWheelEvent = this.onMouseWheel.bind(this)
  }

  create(_image)
  {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.addEventListeners()

    this.scroll =
    {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }

    each(this.selectorChildren, (_entry, _key) =>
    {
      if(_entry instanceof window.HTMLElement || _entry instanceof window.NodeList || Array.isArray(_entry))
        this.elements[_key] = _entry

      else
        this.elements[_key] = document.querySelectorAll(_entry)

        if(this.elements[_key].length === 0)
          this.elements[_key] = null

        else if(this.elements[_key].length === 1)
          this.elements[_key] = document.querySelector(_entry)
    })

    this.createAnimations()
    this.createPreloader()
  }

  createAnimations()
  {

    this.animations = []

    this.animationsTitle = map(this.elements.animationsTitle, _element =>
    {
      return new Title({ _element })
    })

    this.animationsGallerySection = map(this.elements.animationsGallerySection, _element =>
    {
      return new GallerySection({ _element })
    })

    this.animationsParagraph = map(this.elements.animationsParagraph, _element =>
    {
      return new Paragraph({ _element })
    })

    this.animationsLabel = map(this.elements.animationsLabel, _element =>
    {
      return new Label({ _element })
    })

    this.animationsImages = map(this.elements.animationsImages, _element =>
    {
      return new Images({ _element })
    })

    this.animationsLink = map(this.elements.animationsLink, _element =>
    {
      return new Link({ _element })
    })

    this.animations.push(...this.animationsTitle)
    this.animations.push(...this.animationsGallerySection)
    this.animations.push(...this.animationsParagraph)
    this.animations.push(...this.animationsLabel)
    this.animations.push(...this.animationsLink)
  }

  createPreloader()
  {
    this.preloaders = map(this.elements.preloaders, _element =>
    {
      return new AsyncLoad({ _element })
    })
  }

  show()
  {
    return new Promise(resolve =>
    {
      // Color management
      ColorsManager.change({
        backgroundColor: this.element.getAttribute('data-background'),
        color: this.element.getAttribute('data-color')
      })

      this.animationIn = GSAP.timeline()

      this.animationIn.to(this.element,
      {
        autoAlpha: 1,
        onComplete: resolve
      })

      this.animationIn.call(_ =>
      {
        this.addEventListeners()
        resolve()
      })
    })
  }

  hide()
  {
    return new Promise(resolve =>
    {
      this.removeEventListeners()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element,
      {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

  onMouseWheel (_event)
  {
    const { pixelY } = NormalizeWheel(_event)
    this.scroll.target += pixelY
  }

  onResize ()
  {
    if(this.elements.wrapper)
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight

    each(this.animations, _animation => _animation.onResize())
  }

  onMouseMove (_event)
  {
    let mouse = { x: 0, y: 0 }
    mouse.x = _event.clientX
    mouse.y = _event.clientY

    each(this.animations, _animation =>
    {
      if(_animation && _animation.onMouseMove)
        _animation.onMouseMove(mouse)
    })
  }

  update()
  {
    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)
    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

    if(this.scroll.current < 0.01)
      this.scroll.current = 0

    if(this.elements.wrapper)
      this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
      this.elements.wrapper.style.transition = `transform ${this.params.duration}ms ${this.params.timingFunction}`
  }

  addEventListeners ()
  {
    window.addEventListener('mousewheel', this.onMouseWheelEvent)
  }

  removeEventListeners ()
  {
    window.removeEventListener('mousewheel', this.onMouseWheelEvent)
  }
}
