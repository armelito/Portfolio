import GSAP from 'gsap'

import Animation from '../classes/Animation'

import { split } from 'utils/text'
import { Timeline } from 'gsap/gsap-core'
import { each } from 'lodash'

export default class Subtitle extends Animation
{
  constructor ({ element, elements })
  {
    super (
      {
        element,
        elements
      }
    )
    // Split
    split({ element: this.element, append: true })
    split({ element: this.element, append: true })
    // Query DOM
    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn ()
  {
    // Set
    GSAP.set(this.elementLines,
    {
      autoAlpha: 1
    })
    // From
    GSAP.from(this.elementLines,
    {
      y: '100%'
    })
    // To
    GSAP.to(this.elementLines,
    {
      y: '0%',
      delay: 2.8,
      duration: 1,
      stagger: 0.02
    })
  }

  animateOut ()
  {
    // Set
    GSAP.set(this.elementLinesSpans,
    {
      autoAlpha: 0
    })
  }

  onResize ()
  {
    this.elementLines = this.elementLinesSpans
  }
}
