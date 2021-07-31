import GSAP from 'gsap'
import each from 'lodash/each'

import Animation from '../Classes/Animation'

import { split } from 'utils/text'
import { splitWord } from 'utils/letter'

export default class Title extends Animation
{
  constructor ({ _element, _elements })
  {
    super(
      {
        _element,
        _elements
      }
    )

    split({ element: this.element, append: true })
    this.$elementLinesSpans = this.element.querySelectorAll('span span')

    each(this.$elementLinesSpans, _span =>
    {
      splitWord({ element: _span })
    })

    this.$elementWordsLetters = this.element.querySelectorAll('span span span')
  }

  animateIn()
  {

    this.timelineIn = GSAP.timeline({ delay: 0.5})

    this.timelineIn.set(this.elementLetters,
    {
      autoAlpha: 1,
    })

    GSAP.set(this.elementLines,
    {
      autoAlpha: 1,
      duration: 0
    })

    each(this.elementLetters, (_letter, _index) =>
    {
      this.timelineIn.fromTo(_letter,
      {
        y: '100%'
      },
      {
        delay: _index * 0.06,
        duration: 1,
        ease: 'expo-out',
        stagger: 0.014,
        y: '0%'
      }, 0)
    })
  }

  animateOut()
  {
    this.timelineOut = GSAP.timeline({ delay: 0.5})

    this.timelineOut.set(this.elementLines,
    {
      autoAlpha: 0,
      duration: 0
    })

    this.timelineOut.set(this.elementLetters,
    {
      autoAlpha: 0,
      y: '100%'
    })
  }

  onResize()
  {
    this.elementLines = this.$elementLinesSpans
    this.elementLetters = this.$elementWordsLetters
  }
}
