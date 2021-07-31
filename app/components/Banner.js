import Component from 'Classes/Component'

export default class Banner extends Component {
  constructor () {
    super({
      _element: '.banner__wrapper',
      _elements: {
        content: '.banner__content',
        texts: document.querySelectorAll('.banner__content__text')
      }
    })

    if(this.elements.content)
      this.positionTrigger = this.elements.content.clientWidth - this.elements.texts[0].clientWidth + 1.6
  }

  updatePosition()
  {
    this.position += 1

    if(this.position < this.positionTrigger)
    {
      this.elements.content.style.transform = `translateX(-${this.position}px)`
      this.elements.content.style.transition = `transform 300ms cubic-bezier(0.23, 1, 0.32, 1)`
    }
    else if(this.position >= this.positionTrigger)
    {
      this.position = 0,
      this.elements.content.style.transform = `translateX(${this.position}px)`
      this.elements.content.style.transition = `transform 0ms cubic-bezier(0.23, 1, 0.32, 1)`
    }
  }
}
