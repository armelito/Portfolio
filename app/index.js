/*
 *    This app works like a single page application.
 *    It is build without framework all from scratch.
 *    It is a homemade framework.
 *    The back-end is handled with prismic.
 *    THREE.js is used to handle the webgl part to create
 *    a beautiful and powerfull experience.
 *    Bruno Simon and Luis Bizaro were a huge inspiration
 *    for my work.
 *
 */
import each from 'lodash/each'
// Components
import Navigation from './Components/Navigation'
import Preloader from 'Components/Preloader'
// WEBGL
import Experience from './Experience/Experience.js'
// Pages
import About from 'Pages/About'
import Projects from 'Pages/Projects'
import Project from 'Pages/Project'
import Home from 'Pages/Home'
class App
{
  constructor()
  {
    this.createContent()
    this.createExperience()

    this.createPreloader()
    this.createNavigation()
    this.createPages()

    this.addEventListeners()
    this.addLinkListeners()

    this.onResize()
    this.update()
  }
  /*
  *   Init app stuff
  *   -> Navigation
  *   -> Preloader
  *   -> Content : Craft content
  *   -> Experience : Webgl set up with THREE.js library
  *   -> Pages : single page application
  */
  createNavigation()
  {
    this.navigation = new Navigation({ template: this.template })
  }

  createPreloader() // CHECK PRELOADER FILE IF CANVAS
  {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createContent()
  {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createExperience()
  {
    this.experience = new Experience({
      targetElement: document.querySelector('.experience'),
      template: this.template
    })
  }

  createPages()
  {
    this.pages =
    {
      about: new About(),
      projects: new Projects(),
      project: new Project(),
      home: new Home()
    }

    this.page = this.pages[this.template]
    this.page.create()

    this.onResize()
  }

  onPreloaded()
  {
    this.preloader.destroy()
    this.page.show()
  }

  onPopState()
  {
    this.onChange({ _url: window.location.pathname, push: false })
  }

  async onChange({ _url, _push = true })
  {
    this.experience.onChangeStart(this.template)

    await this.page.hide()

    const request = await window.fetch(_url)

    if(request.status === 200)
    {
      const html = await request.text()
      const div = document.createElement('div')

      if(_push) window.history.pushState({}, '', _url)

      div.innerHTML = html
      const divContent = div.querySelector('.content')
      this.template = divContent.getAttribute('data-template')

      this.navigation.onChange(this.template)

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.experience.onChangeEnd(this.template)

      this.page = this.pages[this.template]
      this.page.create()
      this.page.show()

      this.addLinkListeners()
      this.onResize()
    }
    else
    {
      this.onChange({ _url: '/' })
    }
  }

  update()
  {
    if(this.experience && this.experience.update)
      this.experience.update()

    if(this.page && this.page.update)
      this.page.update()

    //if(this.template === 'home') this.pages.home.update()

    window.requestAnimationFrame(() =>
    {
      this.update()
    })
  }
  /*
  *   LISTENERS
  *
  */
  onResize()
  {
    if(this.experience && this.experience.onResize)
      this.experience.onResize()

    if(this.page && this.page.onResize)
      this.page.onResize()
  }

  onTouchStart(_event)
  {

  }

  onTouchMove(_event)
  {

  }

  onMouseDown(_event)
  {

  }

  onMouseMove(_event)
  {
    //if(this.page && this.page.onMouseMove)
    //  this.page.onMouseMove(_event)
  }

  onMouseUp(_event)
  {

  }

  addEventListeners () {

    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))

    //const isTouchCapable = 'ontouchstart' in window

    //if(isTouchCapable)
    //  window.addEventListener('touchstart', this.onTouchStart.bind(this))
    //  window.addEventListener('touchmove', this.onTouchMove.bind(this))
//
    //if(!isTouchCapable)
    //  window.addEventListener("mousedown", this.onMouseDown.bind(this))
    //  window.addEventListener("mousemove", this.onMouseMove.bind(this))
    //  window.addEventListener("mouseup", this.onMouseUp.bind(this))
  }

  addLinkListeners ()
  {
    const links = document.querySelectorAll('a')

    each(links, (_link) =>
    {
      _link.onclick = event =>
      {
        event.preventDefault()

        const { href } = _link

        this.onChange({ _url: href })
      }
    })
  }
}

new App()
