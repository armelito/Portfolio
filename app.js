// Dotenv init
require('dotenv').config()
// Path
const path = require('path')
// Express
const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000
// Prismic init
const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')
const { cpuUsage } = require('process')
const { each } = require('lodash')
// Prismic env variables
const apiEndpoint = process.env.PRISMIC_ENDPOINT
const accessToken = process.env.PRISMIC_ACCESS_TOKEN
// Init API
// Initialize the prismic.io api
const initApi = req =>
{
  return Prismic.getApi(apiEndpoint,
  {
    accessToken: accessToken,
    req: req
  })
}
// Link Resolver => Router
const handleLinkResolver = doc =>
{
  if (doc.type === 'project')
  {
    return `/project/${doc.slug}`
  }

  if (doc.type === 'collections')
  {
    return '/projects'
  }

  if (doc.type === 'about')
  {
    return `/about`
  }
  // Default to homepage
  return '/';
}
// Middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))
// Errors hander
app.use(errorHandler())
// Craft prismic data to the DOM
app.use((req, res, next) =>
{
  // Add resolver links
  res.locals.link = handleLinkResolver
  // Add DOM
  res.locals.PrismicDOM = PrismicDOM
  // Add collections index
  res.locals.Numbers = index =>
  {
    return index == 0 ? 'One' : index == 1 ? 'Two' : index == 2 ? 'Three' : index == 3 ? 'Four' : ''
  }

  next()
})
// Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// Default request
const handleRequest = async api => {
  // Fetch datas
  const meta = await api.getSingle('meta')
  const navigation = await api.getSingle('navigation')
  const preloader = await api.getSingle('preloader')
  // Send
  return {
    meta,
    navigation,
    preloader
  }
}
// Home
app.get('/', async (req, res) =>
{
  // Fetch api
  const api =  await initApi(req)
  // Fetch datas
  const defaults = await handleRequest(api)
  const home = await api.getSingle('home')
  const { results: collections } = await api.query(Prismic.Predicates.at( 'document.type', 'collection' ),
    {
      fetchLinks: ['project.image', 'project.title', 'project.description']
    }
  )

  // Render datas
  res.render('pages/home',
  {
    ...defaults,
    home,
    collections,
  })
})
// About
app.get('/about', async (req, res) =>
{
  // Fetch api
  const api =  await initApi(req)
  // Fetch datas
  const defaults = await handleRequest(api)
  const about = await api.getSingle('about')
  // Render datas
  res.render('pages/about',
  {
    ...defaults,
    about
  })
})
// Projects page
app.get('/projects', async (req, res) =>
{
  // Fetch api
  const api =  await initApi(req)
  // Fetch datas
  const defaults = await handleRequest(api)
  const home = await api.getSingle('home')
  const { results: collections } = await api.query(Prismic.Predicates.at( 'document.type', 'collection' ),
    { fetchLinks: ['project.image', 'project.title', 'project.description'] }
  )

  // Render datas
  res.render('pages/projects',
  {
    ...defaults,
    home,
    collections
  })
})
// Project page
app.get('/project/:uid', async (req, res) =>
{
  //console.log(req.params.uid, REQUEST)
  // Fetch api
  const api =  await initApi(req)
  // Fetch datas
  const defaults = await handleRequest(api)
  const project = await api.getByUID
  (
    'project',
    req.params.uid,
    { fetchLinks: 'collection.title' }
  )
  // Render datas
  res.render('pages/project',
  {
    ...defaults,
    project
  })
})
// Port to listen
app.listen(port, () =>
{
  console.log(`App listening at http://localhost:${port}`)
})
