// Utils
import GSAP from 'gsap'
import each from 'lodash/each'
// Classes
import Component from 'classes/Component'

export default class Banner extends Component {
  constructor () {
    super({
      element: '.banner__wrapper',
      elements: {
        content: '.banner__content',
        texts: document.querySelectorAll('.banner__content__text')
      }
    })
    // Init position
    this.position = 0
    // Position trigger
    this.positionTrigger = this.elements.content.clientWidth - this.elements.texts[0].clientWidth + 1.6
  }

  updatePosition ()
  {
    // Increment
    this.position += 1
    // If inferior to the trigger position
    if (this.position < this.positionTrigger)
    {
      this.elements.content.style.transform = `translateX(-${this.position}px)`
      this.elements.content.style.transition = `transform 300ms cubic-bezier(0.23, 1, 0.32, 1)`
    }
     // If egal / superior to the trigger position
    else if (this.position >= this.positionTrigger)
    {
      this.position = 0
      this.elements.content.style.transform = `translateX(${this.position}px)`
      this.elements.content.style.transition = `transform 0ms cubic-bezier(0.23, 1, 0.32, 1)`
    }
  }
}
