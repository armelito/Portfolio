// Utils
import GSAP from 'gsap'
import each from 'lodash/each'
// Classes
import Component from 'classes/Component'

export default class Gallery extends Component {
  constructor () {
    super({
      element: '.gallery__wrapper',
      elements: {
        links: '.gallery__project__link',
        titles: '.gallery__project__title',
        medias: '.gallery__project__media',
      }
    })
  }

  titlesPosition ()
  {
    let Free_1, Free_2, Photo_1, Photo_2, Armel_1, Armel_2, Hetic_1, Hetic_2, Perso_1, Perso_2, ABC_1, ABC_2, Koober_1, Koober_2, DesignSystem_1, DesignSystem_2, Ooze_1, Ooze_2, Eskimo_1, Eskimo_2

    const pos =
    [
      Free_1 = 200,
      Free_2 = 200,
      Photo_1 = 280,
      Photo_2 = 280,
      Armel_1 = 460,
      Armel_2 = 460,
      Hetic_1 = 340,
      Hetic_2 = 340,
      Perso_1 = 240,
      Perso_2 = 240,
      ABC_1 = 430,
      ABC_2 = 430,
      Koober_1 = 370,
      Koober_2 = 370,
      DesignSystem_1 = 280,
      DesignSystem_2 = 280,
      Ooze_1 = 479,
      Ooze_2 = 479,
      Eskimo_1 = 450,
      Eskimo_2 = 450,
    ]

    each(this.elements.titles, (title, index) =>
    {
      title.style.marginLeft = `${pos[index]}px`
    })
  }

  imagesPosition ()
  {
    // Calc here image position
  }

}
