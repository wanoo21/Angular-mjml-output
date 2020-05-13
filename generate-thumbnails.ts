import { promisify } from 'util'
import webshot from 'webshot'
import path from 'path'
import fs from 'fs'
import mjml2html from 'mjml'

import categories from './templates/templates.json'
import { getFilePathByType } from './utils'

const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

const TEMPLATES_FOLDER = path.join(__dirname, 'templates')
const THUMB_FOLDER = path.join(__dirname, 'thumbnails')

const WEBSHOT_OPTIONS = {
  siteType: 'html',
  screenSize: {
    width: 700,
  },
  shotSize: {
    width: 700,
    height: 'all',
  },
  defaultWhiteBackground: true,
}

async function isWritableOrCreate(folder: string) {
  try {
    await access(folder, fs.constants.R_OK | fs.constants.W_OK)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdir(folder)
    } else {
      throw err
    }
  }
}

async function generateThumbnail(category: string, template: string) {
  const thumbName = path.join(THUMB_FOLDER, `${category}-${template}.jpg`)
  // Don't generate existing thumbnails
  if (fs.existsSync(thumbName)) {
    // console.log(` > Skipping ${category}/${template}`)
    return Promise.resolve()
  }
  console.log(` > Creating ${category}/${template}`)
  const mjml = fs.readFileSync(
    getFilePathByType(path.join(TEMPLATES_FOLDER, category, template), '.mjml'),
    { encoding: 'utf-8' }
  )
  const html = await getHTML(mjml);
  await shot(thumbName, html)
}

function getHTML(mjml: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const res = mjml2html(mjml)
      resolve(res.html)
    } catch (err) {
      reject(err)
    }
  })
}

function shot(name: string, html: string) {
  return new Promise((resolve, reject) => {
    webshot(html, name, WEBSHOT_OPTIONS, (err: Error) => {
      if (err) { return reject(err) }
      resolve()
    })
  })
}

(async function () {
  try {

    await isWritableOrCreate(THUMB_FOLDER)

    // console.log('>> Reading templates')
    // const templatesWithContent = await Promise.all(templates.map(readContent))

    console.log('>> Generating thumbnails')
    await categories.reduce((promise, { templates, category }) => {
      return promise.then(() => templates.reduce((promise2, template) => {
        return promise2.then(() => generateThumbnail(category, template))
      }, Promise.resolve()))
    }, Promise.resolve())

  } catch (err) {
    console.log('> Something went wrong')
    console.log(err.message || err)
    process.exit(1)
  }
})()
