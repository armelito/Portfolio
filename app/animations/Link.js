// Libraries
import each from 'lodash/each'
// Animation
import Animation from '../classes/Animation'
// Utils
import { split } from 'utils/text'
import { splitWord } from 'utils/letter'
// Exports
export default class Link extends Animation
{
  constructor ({ element, elements })
  {
    super (
      {
        element,
        elements
      }
    )
    // Variables
    this.bool = false
    this.delayRatio = 0.09
    this.durationRatio = 50
    this.lettersToHideReverse = []
    this.lettersToRevealReverse = []
    // DOM
    this.spans = this.element.querySelectorAll('.link--select')
    // SPLIT BY WORDS
    each(this.spans, span =>
    {
      split({ element: span, append: true })
    })
    // Craft DOM
    this.elementLinesSpans = this.element.querySelectorAll('.link--select span')
    // SPLIT BY LETTERS
    each(this.elementLinesSpans, span =>
    {
      splitWord({ element: span })
    })
    // Craft DOM
    this.spanToHide = this.element.querySelectorAll('.--span-to-hide') // Span to hide wrapper
    this.spanToReveal = this.element.querySelectorAll('.--span-to-reveal')  // Span to reveal wrapper
    this.lettersToHide = this.element.querySelectorAll('.--span-to-hide span span') // Letters to hive
    this.lettersToReveal = this.element.querySelectorAll('.--span-to-reveal span span') // Letter to reveal
    // Reverse arrays for letters to hide
    each(this.lettersToHide, letters =>
    {
      this.lettersToHideReverse.push(letters)
    })
    // Reverse arrays for letters to reveal
    each(this.lettersToReveal, letters =>
    {
      this.lettersToRevealReverse.push(letters)
    })
    // Reverse arrays
    this.lettersToHideReverse.reverse()
    this.lettersToRevealReverse.reverse()
  }


  animateIn (_event)
  {
    // Update boolean
    this.bool = true
    /* Animation
     *  letters to reveal iteration  */
    each(this.elementLettersToReveal, (letterToReveal, index) =>
    {
      // Animation calcs
      this.animationDuration = 800 - index * this.durationRatio
      this.animationDelay = index * ( this.delayRatio - ( index * this.delayRatio / 100 ))
      // Init reveal function
      this.show(letterToReveal, this.animationDelay, this.animationDuration)
    })
    // Letters to hide iteration
    each(this.elementLettersToHide, (letterToHide, index) =>
    {
      // Animation calcs
      this.animationDuration = 800 - index * this.durationRatio
      this.animationDelay = index * ( this.delayRatio - ( index * this.delayRatio / 100 ))
      // Init hide function
      this.hide(letterToHide, this.animationDelay, this.animationDuration)
    })
  }

  animateOut (_event)
  {
    // Update boolean
    this.bool = false
     /* Animation
      * letters to reveal iteration  */
    each(this.elementLettersToRevealReverse, (letterToReveal, index) =>
    {
      // Animation calcs
      this.animationDuration = 800 - index * this.durationRatio
      this.animationDelay = index * ( this.delayRatio - ( index * this.delayRatio / 100 ))
      // Init reveal function
      this.show(letterToReveal, this.animationDelay, this.animationDuration)
    })
    // Letters to hide iteration
    each(this.elementLettersToHideReverse, (letterToHide, index) =>
    {
      // Animation calcs
      this.animationDuration = 800 - index * this.durationRatio
      this.animationDelay = index * ( this.delayRatio - ( index * this.delayRatio / 100 ))
      // Init hide function
      this.hide(letterToHide, this.animationDelay, this.animationDuration)
    })
  }

  show (_letterToReveal, _delay, _duration)
  {
    // If animateIn
    if (this.bool)
    {
      _letterToReveal.style.transform = "translateY(0%) translateZ(20px) rotateX(0deg) rotateY(0deg)"
      _letterToReveal.style.transition = `transform ${_duration}ms cubic-bezier(.42,0,.87,.28) ${_delay}s`
    }
    // If animateOut
    else
    {
      _letterToReveal.style.transform = "translateY(100%) translateZ(0) rotateX(-90deg) rotateY(-2deg)"
      _letterToReveal.style.transition = `transform ${_duration}ms cubic-bezier(.42,0,.87,.28) ${_delay}s`
    }
  }

  hide (_letterToHide, _delay, _duration)
  {
    // If animateIn
    if (this.bool)
    {
      _letterToHide.style.transform = "translateY(-100%) translateZ(20px) rotateX(90deg) rotateY(-2deg)"
      _letterToHide.style.transition = `transform ${_duration}ms cubic-bezier(.42,0,.87,.28) ${_delay}s`
    }
    // If animateOut
    else
    {
      _letterToHide.style.transform = "translateY(0%) translateZ(0px) rotateX(0deg) rotateY(0deg)"
      _letterToHide.style.transition = `transform ${_duration}ms cubic-bezier(.42,0,.87,.28) ${_delay}s`
    }
  }

  onResize ()
  {
    this.elementLines = this.elementLinesSpans
    this.elementLettersToHide = this.lettersToHide
    this.elementLettersToReveal = this.lettersToReveal
    this.elementLettersToHideReverse = this.lettersToHideReverse
    this.elementLettersToRevealReverse = this.lettersToRevealReverse
  }
}
