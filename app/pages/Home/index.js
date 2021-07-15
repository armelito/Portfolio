// Lodash
import each from 'lodash/each'
// Classes
import Page from 'classes/Page'
// Component
import Gallery from 'components/Gallery'
import Banner from 'components/Banner'

export default class Home extends Page {
  constructor () {
    super({
      id: 'home',
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        section: document.querySelector('.gallery__project'),
        navigation: document.querySelector('.navigation'),
        link: '.home__link',
      }
    })
    // Create projects gallery
    this.createComponents()
    // Update elements position
    this.updatePosition()
  }

  createComponents ()
  {
    // Init components
    this.gallery = new Gallery()
    this.banner = new Banner()
    // Init functions
    this.gallery.titlesPosition()
    this.gallery.imagesPosition()
  }

  updatePosition ()
  {
    // Init update function if page is updated
    if (this.banner && this.banner.updatePosition)
    {
      this.banner.updatePosition()
    }
    // Loop
    this.frame = window.requestAnimationFrame(this.updatePosition.bind(this))
  }

  //onResize () {
  //  // Update pos on resize
  //  this.updatePosition()
  //}

}
