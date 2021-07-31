import GSAP from 'gsap'
import each from 'lodash/each'
import Animation from '../Classes/Animation'

import { split } from 'utils/text'

export default class Paragraph extends Animation
{
  constructor({ _element, _elements })
  {
    super(
      {
        _element,
        _elements
      }
    )

    this.elementLinesSpans = split({ append: true, element: this.element })
  }

  animateIn()
  {
    this.timelineIn = GSAP.timeline({ delay: 0.5 })

    GSAP.set(this.elementLines,
    {
      autoAlpha: 1
    })

    each(this.elementLines, (_line, _index) =>
    {
      this.timelineIn.fromTo(_line,
      {
        autoAlpha: 0,
        y: '100%'
      },
      {
        autoAlpha: 1,
        delay: _index * 0.2,
        duration: 1.6,
        ease: 'expo-out',
        stagger: 0.014,
        y: '0%'
      }, 0)
    })
  }

  animateOut ()
  {
    GSAP.set(this.elementLines,
    {
      autoAlpha: 0
    })
  }

  onResize()
  {
    this.elementLines = this.$elementLinesSpans
  }
}
