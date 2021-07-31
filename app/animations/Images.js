import GSAP from 'gsap'

import Animation from '../Classes/Animation'

export default class Images extends Animation
{
  constructor ({ _element, _elements })
  {
    super (
      {
        _element,
        _elements
      }
    )
  }

  animateIn()
  {
    GSAP.set(this.image,
    {
      autoAlpha: 1,
      y: '-100%',
    })
  }

  animateOut()
  {
    GSAP.to(this.image,
    {
      y: '0%',
      delay: 2.8,
      duration: 1,
      stagger: 0.02
    })
  }

  onResize()
  {
    this.image = calculate(this.element)
  }
}
