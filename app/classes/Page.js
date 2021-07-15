// Modules
import GSAP from 'gsap'
import Prefix from 'prefix'
import NormalizeWheel from 'normalize-wheel'
// Animation
import Title from '../animations/Titles'
import Paragraph from '../animations/Paragraph'
import Label from '../animations/Label'
import Images from '../animations/Images'
import Link from '../animations/Link'
// Lodash
import each from 'lodash/each'
import map from 'lodash/map'
// Classes
import { ColorsManager } from './Colors'
import AsyncLoad from './AsyncLoad'
// Classe
export default class Page {
  constructor ({
    element,
    elements,
    id
  })
  {
    this.selector = element
    this.selectorChildren =
    {
      ...elements,
      animationsTitle: '[data-animation="title"]',
      //animationsSubtitle: '[data-animation="subtitle"]',
      animationsParagraph: '[data-animation="paragraph"]',
      animationsLabel: '[data-animation="label"]',
      animationsLink: '[data-animation="link"]',
      preloaders: '[data-src]',
    }
    // ID
    this.id = id
    // Prefix for browser
    this.transformPrefix = Prefix('transform')
    // Init params
    this.params = {
      duration: '1000', // Scroll duration
      timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)', // Timingfunction
    }
    // Bind this
    this.onMouseWheelEvent = this.onMouseWheel.bind(this)
  }

  create (image)
  {
    // Create elements
    this.element = document.querySelector(this.selector)
    this.elements = {}
    // Init event listeners
    this.addEventListeners()
    // Scroll object
    this.scroll =
    {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }
    // Query methods
    each(this.selectorChildren, (entry, key) =>
    {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry))
      {
        this.elements[key] = entry
      }
      else
      {
        this.elements[key] = document.querySelectorAll(entry)
        // If there is no element
        if (this.elements[key].length === 0)
        {
          this.elements[key] = null
        }
        // If there is one element
        else if (this.elements[key].length === 1)
        {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
    console.log('createpage')
    // Init functions
    this.createAnimations()
    this.createPreloader()
  }

  createAnimations ()
  {
    console.log('createanim')
    // Create animations array
    this.animations = []
    // Title
    this.animationsTitle = map(this.elements.animationsTitle, element =>
    {
      return new Title({ element })
    })
    // Paragraph
    this.animationsParagraph = map(this.elements.animationsParagraph, element =>
    {
      return new Paragraph({ element })
    })
    // Labels
    this.animationsLabel = map(this.elements.animationsLabel, element =>
    {
      return new Label({ element })
    })
    // Images
    this.animationsImages = map(this.elements.animationsImages, element =>
    {
      return new Images({ element })
    })
    // Hover
    this.animationsLink = map(this.elements.animationsLink, element =>
    {
      return new Link({ element })
    })
    // Push animations in the array
    this.animations.push(...this.animationsTitle)
    this.animations.push(...this.animationsParagraph)
    this.animations.push(...this.animationsLabel)
    this.animations.push(...this.animationsLink)

    console.log(this.animations)
  }

  createPreloader ()
  {
    // Map elements with data-src attribute
    this.preloaders = map(this.elements.preloaders, element =>
    {
      // Create asyn object passing the element as params
      return new AsyncLoad({ element })
    })
  }

  // Show with GSAP animation
  show (_previousImage)
  {
    return new Promise(resolve =>
    {
      // Color management
      ColorsManager.change({
        backgroundColor: this.element.getAttribute('data-background'),
        color: this.element.getAttribute('data-color')
      })
      // Next image values
      const nextImage = document.querySelector('.project__media__image')
      const nextImagePosX = _previousImage.pos.x - nextImage.getBoundingClientRect().left
      const nextImagePosY = _previousImage.pos.y - nextImage.getBoundingClientRect().top
      // Timeline init
      this.animationIn = GSAP.timeline()
      // Show the current page
      this.animationIn.to(this.element,
      {
        autoAlpha: 1,
        onComplete: resolve
      })
      // If we are in a project page
      if (this.id === 'project')
      {
        // If there is a previous image
        if (_previousImage.current)
        {
          // Move from the initial position of the previous image
          this.animationIn.from(this.selectorChildren.imageHero,
          {
            //scale: 0.8,
            x: _previousImage.pos.x,
            y: nextImagePosY,
            duration: 2,
            stagger: 0.01,
            ease: 'expo-out',
          })
          // To the position of the project page image
          this.animationIn.to(this.selectorChildren.imageHero,
          {
            //scale: 1,
            x: 0,
            y: 0,
            ease: 'expo-out',
          })
        }
      }
      // Call events
      this.animationIn.call(_ =>
      {
        this.addEventListeners()
        resolve()
      })
    })
  }
  // Hide with GSAP animation
  hide (_image)
  {
    return new Promise(resolve =>
    {
      // Remove events
      this.removeEventListeners()
      // Init timeline
      this.animationOut = GSAP.timeline()
      // Hide
      /*if (_image.current)
      {
        this.animationOut.to(_image.current,
        {
          //scale: 0.8,
          duration: 1.6,
          ease: 'expo-out',
          stagger: 0.01
        })
      }*/
      this.animationOut.to(this.element,
      {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
  // Mousewheel function
  onMouseWheel (_event)
  {
    const { pixelY } = NormalizeWheel(_event)
    this.scroll.target += pixelY

    //if (this.canvas && this.canvas.onWheel)
    //{
    //  this.canvas.onWheel(pixelY)
    //}
  }
  // Resize function
  onResize ()
  {
    //this.sectionClientHeight = this.elements.section.clientHeight
    if (this.elements.wrapper)
    {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    }

    each(this.animations, animation => animation.onResize())
  }
  // Loop function
  update ()
  {
    // Clamp for limit
    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)
    // Interpolate
    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)
    // Handle JS error
    if(this.scroll.current < 0.01)
    {
      this.scroll.current = 0
    }
    // Translate wrapper with transition
    if(this.elements.wrapper)
    {
      this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
      this.elements.wrapper.style.transition = `transform ${this.params.duration}ms ${this.params.timingFunction}`
    }
  }
  // Listeners
  addEventListeners ()
  {
    window.addEventListener('mousewheel', this.onMouseWheelEvent)
  }

  removeEventListeners ()
  {
    window.removeEventListener('mousewheel', this.onMouseWheelEvent)
  }
}
