// Libraries
import GSAP from 'gsap'
import each from 'lodash/each'
// Animation
import Animation from '../classes/Animation'
// Utils
import { split } from 'utils/text'
import { splitWord } from 'utils/letter'
// Exports
export default class Title extends Animation
{
  constructor ({ element, elements })
  {
    super (
      {
        element,
        elements
      }
    )
    // SPLIT BY WORDS
    split({ element: this.element, append: true })
    this.elementLinesSpans = this.element.querySelectorAll('span span')
    // SPLIT BY LETTERS
    each(this.elementLinesSpans, span =>
    {
      splitWord({ element: span })
    })
    // Craft letters of each words
    this.elementWordsLetters = this.element.querySelectorAll('span span span')
  }

  animateIn ()
  {
    // Init timeline
    this.timelineIn = GSAP.timeline({ delay: 0.5})
    // Animation
    this.timelineIn.set(this.elementLetters,
    {
      autoAlpha: 1,
    })

    GSAP.set(this.elementLines,
    {
      autoAlpha: 1,
      duration: 0
    })

    each(this.elementLetters, (letter, index) =>
    {
      this.timelineIn.fromTo(letter,
      {
        y: '100%'
      },
      {
        delay: index * 0.06,
        duration: 1,
        ease: 'expo-out',
        stagger: 0.014,
        y: '0%'
      },
      0)
    })
  }

  animateOut ()
  {
    // Init timeline
    this.timelineOut = GSAP.timeline({ delay: 0.5})
    // Animation
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

  onResize ()
  {
    this.elementLines = this.elementLinesSpans
    this.elementLetters = this.elementWordsLetters
  }
}
