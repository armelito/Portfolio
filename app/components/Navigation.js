import GSAP from 'gsap'
import each from 'lodash/each'

import Component from 'Classes/Component'

import { PRIMARY_DEFAULT, PRIMARY_DARK } from 'utils/colors'

export default class Navigation extends Component {
  constructor ({ _template }) {
    super({
      _element: '.navigation',
      _elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link',
        projects: '.gallery__project__link'
      }
    })
  }

  onChange (_template)
  {
    if (_template === 'about')
    {
      //GSAP.to(this.element, {
      //  color: PRIMARY_DEFAULT,
      //  duration: 1.5
      //})

      //GSAP.to(this.elements.items[0], {
      //  autoAlpha: 1,
      //  delay: 0.75,
      //  duration: 0.75
      //})

      //GSAP.to(this.elements.items[1], {
      //  autoAlpha: 0,
      //  duration: 0.75
      //})
    } /*else {
      GSAP.to(this.element, {
        color: PRIMARY_DARK,
        duration: 1.5
      })

      GSAP.to(this.elements.items[0], {
        autoAlpha: 0,
        duration: 0.75
      })

      GSAP.to(this.elements.items[1], {
        autoAlpha: 1,
        delay: 0.75,
        duration: 0.75
      })
    }*/
  }
}
