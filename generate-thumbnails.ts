import {promisify} from 'node:util'
import webshot from 'webshot'
import path, {dirname} from 'node:path'
import fs from 'node:fs'
import mjml2html from 'mjml'
import {fileURLToPath} from "node:url";

import categories from './templates/templates.json'
import {getFilePathByType} from './utils'

const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

const TEMPLATES_FOLDER = path.join(dirname(fileURLToPath(import.meta.url)), 'templates')
const THUMB_FOLDER = path.join(dirname(fileURLToPath(import.meta.url)), 'thumbnails')

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
    // @ts-ignore
    if (err.code === 'ENOENT') {
      await mkdir(folder)
    } else {
      throw err
    }
  }
}

async function generateThumbnail(category: string, template: string) {
  console.log(` > Creating ${category}/${template}`)
  const mjml = fs.readFileSync(
    getFilePathByType(path.join(TEMPLATES_FOLDER, category, template), '.mjml'),
    {encoding: 'utf-8'}
  )
  const html = await getHTML(mjml);
  await Promise.all([shot(category, template, html), /** shot(category, template, html, true) */])
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

function shot(category: string, template: string, html: string, small = false) {
  const thumbName = path.join(THUMB_FOLDER, `${category}/${template}/${!small ? template : `${template}x300`}.jpg`)

  // Don't generate existing thumbnails
  if (fs.existsSync(thumbName)) {
    return Promise.resolve()
  }
  return new Promise<void>((resolve, reject) => {
    webshot(html, thumbName, {
      ...WEBSHOT_OPTIONS, ...(small && {screenSize: {width: 300}, shotSize: {width: 300}})
    }, (err: Error) => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

(async function () {
  try {

    await isWritableOrCreate(THUMB_FOLDER)

    console.log('>> Generating thumbnails')
    await categories.reduce(async (promise, {templates, category}) => {
      await promise
      return await templates.reduce(async (promise2, template) => {
        await promise2
        return await generateThumbnail(category, template)
      }, Promise.resolve())
    }, Promise.resolve())

  } catch (err) {
    console.log('> Something went wrong')
    // @ts-ignore
    console.log(err.message || err)
    process.exit(1)
  }
})()
