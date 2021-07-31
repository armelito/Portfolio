import Page from 'Classes/Page'

export default class Project extends Page {
  constructor () {
    super({
      _id: 'project',
      _element: '.project',
      _elements: {
        wrapper: '.project__wrapper',
        navigation: document.querySelector('.navigation'),
        imageHero: '.project__media__image'
      }
    })
  }
}
