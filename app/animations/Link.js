import each from 'lodash/each'

import Animation from '../Classes/Animation'

import { split } from 'utils/text'
import { splitWord } from 'utils/letter'

export default class Link extends Animation
{
  constructor ({ _element, _elements })
  {
    super (
      {
        _element,
        _elements
      }
    )

    this.bool = false
    this.delayRatio = 0.09
    this.durationRatio = 50
    this.lettersToHideReverse = []
    this.lettersToRevealReverse = []

    this.$spans = this.element.querySelectorAll('.link--select')

    each(this.$spans, _span =>
    {
      split({ element: _span, append: true })
    })

    this.$elementLinesSpans = this.element.querySelectorAll('.link--select span')

    each(this.$elementLinesSpans, _span =>
    {
      splitWord({ element: _span })
    })

    this.$spanToHide = this.element.querySelectorAll('.--span-to-hide') // Span to hide wrapper
    this.$spanToReveal = this.element.querySelectorAll('.--span-to-reveal')  // Span to reveal wrapper
    this.$lettersToHide = this.element.querySelectorAll('.--span-to-hide span span') // Letters to hive
    this.$lettersToReveal = this.element.querySelectorAll('.--span-to-reveal span span') // Letter to reveal

    each(this.$lettersToHide, _letters =>
    {
      this.lettersToHideReverse.push(_letters)
    })

    each(this.$lettersToReveal, _letters =>
    {
      this.lettersToRevealReverse.push(_letters)
    })

    this.lettersToHideReverse.reverse()
    this.lettersToRevealReverse.reverse()
  }


  animateIn(_event)
  {
    this.bool = true

    each(this.elementLettersToReveal, (_letterToReveal, _index) =>
    {
      this.animationDuration = 800 - _index * this.durationRatio
      this.animationDelay = _index * ( this.delayRatio - ( _index * this.delayRatio / 100 ))

      this.show(_letterToReveal, this.animationDelay, this.animationDuration)
    })

    each(this.elementLettersToHide, (_letterToHide, _index) =>
    {
      this.animationDuration = 800 - _index * this.durationRatio
      this.animationDelay = _index * ( this.delayRatio - ( _index * this.delayRatio / 100 ))

      this.hide(_letterToHide, this.animationDelay, this.animationDuration)
    })

    //this.$media = this.element.parentNode.querySelector('figure')
    //this.$media.style.opacity = '1'
    //this.$media.style.zIndex = '2000'
    //this.$media.style.transform = `translateX(0) translateY(0) scaleX(1)`
  }

  animateOut (_event)
  {
    this.bool = false

    each(this.elementLettersToRevealReverse, (_letterToReveal, _index) =>
    {
      this.animationDuration = 800 - _index * this.durationRatio
      this.animationDelay = _index * ( this.delayRatio - ( _index * this.delayRatio / 100 ))

      this.show(_letterToReveal, this.animationDelay, this.animationDuration)
    })

    each(this.elementLettersToHideReverse, (_letterToHide, _index) =>
    {
      this.animationDuration = 800 - _index * this.durationRatio
      this.animationDelay = _index * ( this.delayRatio - ( _index * this.delayRatio / 100 ))
      // Init hide function
      this.hide(_letterToHide, this.animationDelay, this.animationDuration)
    })

    //this.$media.style.opacity = '0'
    //this.$media.style.zIndex = '0'
    //this.$media.style.transform = `translateX(-20px) translateY(100px) scaleX(0.25)`
  }

  show (_letterToReveal, _delay, _duration)
  {
    this.bool ?
    (
      _letterToReveal.style.transform = "translateY(0%) translateZ(20px) rotateX(0deg) rotateY(0deg)",
      _letterToReveal.style.transition = `transform ${_duration}ms cubic-bezier(.42,0,.87,.28) ${_delay}s`
    ) :
    (
      _letterToReveal.style.transform = "translateY(100%) translateZ(0) rotateX(-90deg) rotateY(-2deg)",
      _letterToReveal.style.transition = `transform ${_duration}ms cubic-bezier(.42,0,.87,.28) ${_delay}s`
    )
  }

  hide (_letterToHide, _delay, _duration)
  {
    this.bool ?
    (
      _letterToHide.style.transform = "translateY(-100%) translateZ(20px) rotateX(90deg) rotateY(-2deg)",
      _letterToHide.style.transition = `transform ${_duration}ms cubic-bezier(.42,0,.87,.28) ${_delay}s`
    ) :
    (
      _letterToHide.style.transform = "translateY(0%) translateZ(0px) rotateX(0deg) rotateY(0deg)",
      _letterToHide.style.transition = `transform ${_duration}ms cubic-bezier(.42,0,.87,.28) ${_delay}s`
    )
  }

  onResize ()
  {
    this.elementLines = this.$elementLinesSpans
    this.elementLettersToHide = this.$lettersToHide
    this.elementLettersToReveal = this.$lettersToReveal
    this.elementLettersToHideReverse = this.lettersToHideReverse
    this.elementLettersToRevealReverse = this.lettersToRevealReverse
  }
}
