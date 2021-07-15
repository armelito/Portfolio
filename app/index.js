// lodash tool
import each from 'lodash/each'
// Components
import Navigation from './components/Navigation'
import Preloader from 'components/Preloader'
import Canvas from 'components/Canvas'
// Pages
import About from 'pages/About'
import Projects from 'pages/Projects'
import Project from 'pages/Project'
import Home from 'pages/Home'
// App
class App
{
  constructor()
  {
    // Create content
    this.createContent()
    this.createCanvas()
    // Init Preloader and navigation stuff
    this.createPreloader()
    this.createNavigation()
    // Then create the pages
    this.createPages()
    // Then add listeners
    this.addEventListeners()
    this.addLinkListeners()
    // Init on window resize fuctions
    this.onResize()
    // Init updates
    this.update()
  }

  createNavigation()
  {
    // Init navigation
    this.navigation = new Navigation({
      template: this.template
    })
  }

  createPreloader() // CHECK PRELOADER FILE IF CANVAS
  {
    // Init navigation
    this.preloader = new Preloader()//{ canvas: this.canvas })
    // Emit event when completed
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createContent()
  {
    // Init content
    this.content = document.querySelector('.content')
    // Get current template
    this.template = this.content.getAttribute('data-template')
  }

  createCanvas()
  {
    this.canvas = new Canvas({ template: this.template })
  }

  createPages()
  {
    // Init pages
    this.pages = {
      about: new About(),
      projects: new Projects(),
      project: new Project(),
      home: new Home()
    };
    // Init current page based on current template
    this.page = this.pages[this.template]
    // Create the page
    this.page.create()
    // Onresize upadtes
    this.onResize()
  }

  onPreloaded()
  {
    //this.onResize()
    //this.canvas.onPreloaded()
    // Destroy the preloader when completed
    this.preloader.destroy()
    // Then show the page
    this.page.show()
  }

  async onChange({ _url }, _img, _sectionParams)
  {
    // Previous image stuff
    this.previousImage =
    {
      current: null,
      pos:
      {
        x: _sectionParams.paddingRight,
        y: _sectionParams.paddingTop + _sectionParams.offsetTop
      }
    }
    // If there was an image in the link
    if (_img)
    {
      // Init it as current image
      this.previousImage.current = _img
    }

    // Start Canvas
    //this.canvas.onChangeStart(this.template)
    // Wait for the page to be hidden
    await this.page.hide(this.previousImage)
    // Then fetch url
    const request = await window.fetch(_url)
    // And if there's no error
    if (request.status === 200)
    {
      // Get html
      const html = await request.text()
      // Create a div
      const div = document.createElement('div')
      // Craft the html
      div.innerHTML = html
      // Get content and update the template value
      const divContent = div.querySelector('.content')
      this.template = divContent.getAttribute('data-template')
      // Send the template when the navigation is changing
      this.navigation.onChange(this.template)
      // Set the new current template
      this.content.setAttribute('data-template', this.template)
      // Set the html of this new template
      this.content.innerHTML = divContent.innerHTML
      // End canvas
      //this.canvas.onChangeEnd(this.template)
      // Get the page related to the template then create it and then show it
      this.page = this.pages[this.template]
      this.page.create()
      this.page.show(this.previousImage)
      // Init the listeners
      this.addLinkListeners()
      // Init onResize functions
      this.onResize()
    }
    // If there's an error
    else
    {
      console.log('error')
      // Go the home page
      this.onChange({ _url: '/' })
    }
  }

  params (_link) {
    const params = {}
    // Get the image of the link clicked
    params.image = _link.querySelector('.gallery__project__media__image')
    // Get the wrapper
    const wrapper = document.querySelector('.home__wrapper')
    // Get the section of the link clicked
    const section = _link.parentElement
    // Init the section offsetTop
    let sectionOffesetTop = 0
    // If wrapper is not null
    if (wrapper)
    {
      // Caculate the section offsetTop
      const scrollStyle = wrapper.style.transform
      sectionOffesetTop = scrollStyle.match(/(\d+)/)
    }
    // Calculate the section params
    params.sectionParams =
    {
      element: section,
      offsetTop: section.offsetTop - sectionOffesetTop[0],
      offsetLeft: section.getBoundingClientRect().left,
      paddingTop: window.innerWidth / 1440 * 80,
      paddingRight: window.innerWidth / 1440 * 164
    }

    return params
  }

  update () {
    // Init update function if page is updated
    if (this.page && this.page.update)
    {
      this.page.update()
    }

    if (this.canvas && this.canvas.update)
    {
      this.canvas.update(this.page.scroll)
    }
    // Loop
    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  onResize () {
    // Init resize function if page is updated
    if (this.page && this.page.onResize)
    {
      this.page.onResize()
    }
    // Canvas
    if (this.canvas && this.canvas.onResize)
    {
      this.canvas.onResize()
    }
    // Canvas loop
    //window.requestAnimationFrame((_) =>
    //{
    //  if (this.canvas && this.canvas.onResize)
    //  {
    //    this.canvas.onResize()
    //  }
    //})
  }

  onMouseDown(event)
  {
    if (this.canvas && this.canvas.onMouseDown)
    {
      this.canvas.onMouseDown(event)
    }
  }

  onMouseMove(event)
  {
    if (this.canvas && this.canvas.onMouseMove)
    {
      this.canvas.onMouseMove(event)
    }
  }

  onMouseUp(event)
  {
    if (this.canvas && this.canvas.onMouseUp)
    {
      this.canvas.onMouseUp(event)
    }
  }

  addEventListeners () {
    // On resize
    window.addEventListener('resize', this.onResize.bind(this))
    window.addEventListener("mousedown", this.onMouseDown.bind(this))
    window.addEventListener("mousemove", this.onMouseMove.bind(this))
    window.addEventListener("mouseup", this.onMouseUp.bind(this))
  }

  addLinkListeners ()
  {
    // Get all links
    const links = document.querySelectorAll('a')
    // For each link
    each(links, (link) =>
    {
      // Onclick
      link.onclick = event =>
      {
        // Deleted default stuff
        event.preventDefault()
        // Update params
        const params = this.params(link)
        // Set the location of the link clicked
        const { href } = link
        // Init onChange when a link is clicked passing the params we need
        this.onChange({ _url: href }, params.image, params.sectionParams)
      }
    })
  }
}

new App()
