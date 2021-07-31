import Page from 'Classes/Page'

export default class About extends Page {
  constructor () {
    super({
      _id: 'about',
      _element: '.about',
      _elements: {
        wrapper: '.about__wrapper',
        navigation: document.querySelector('.navigation'),
        title: '.about__title'
      }
    })
  }
}
