// Lodash
import each from 'lodash/each'
// Classes
import Page from 'Classes/Page'
// Component
import Gallery from 'Components/Gallery'
import Banner from 'Components/Banner'

export default class Home extends Page {
  constructor () {
    super({
      _id: 'home',
      _element: '.home',
      _elements: {
        wrapper: '.home__wrapper',
        section: document.querySelector('.gallery__project'),
        navigation: document.querySelector('.navigation'),
        link: '.home__link',
      }
    })

    this.createComponents()
  }

  createComponents()
  {
    this.gallery = new Gallery()
    //this.banner = new Banner()
  }

  onUpdate()
  {
    this.gallery.titlesPosition()

    //if(this.banner && this.banner.updatePosition)
    //  this.banner.updatePosition()
  }
}
