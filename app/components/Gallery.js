// Utils
import GSAP from 'gsap'
import each from 'lodash/each'
// Classes
import Component from 'Classes/Component'

export default class Gallery extends Component {
  constructor () {
    super({
      _element: '.gallery__wrapper',
      _elements: {
        links: '.gallery__project__link',
        titles: '.gallery__project__title',
        medias: '.gallery__project__media',
      }
    })
  }

  titlesPosition()
  {

  }
}
