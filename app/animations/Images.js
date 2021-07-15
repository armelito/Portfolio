import GSAP from 'gsap'
import { Timeline } from 'gsap/gsap-core'

import Animation from '../classes/Animation'

import { each } from 'lodash'

export default class Images extends Animation
{
  constructor ({ element, elements })
  {
    super (
      {
        element,
        elements
      }
    )
  }

  animateIn ()
  {
    GSAP.set(this.image,
    {
      autoAlpha: 1,
      y: '-100%',
    })
  }

  animateOut ()
  {
    GSAP.to(this.image,
    {
      y: '0%',
      delay: 2.8,
      duration: 1,
      stagger: 0.02
    })
  }

  onResize ()
  {
    this.image = calculate(this.element)
  }
}
