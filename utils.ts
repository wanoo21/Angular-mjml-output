import {dirname, join} from 'node:path'
import {readdirSync} from 'node:fs'
import {fileURLToPath} from "node:url";

export function getDirectoriesNames(directory: string) {
  return readdirSync(directory, {withFileTypes: true})
  .filter(dir => dir.isDirectory()).map(({name}) => name)
}

export function getFilePathByType(directory: string, type: string) {
  const file = readdirSync(directory, {withFileTypes: true}).filter(file => {
    return file.isFile() && file.name.endsWith(type)
  }).map(({name}) => name)
  return `${directory}/${file}`
}

export function getEmailJSON(category: string, template: string) {
  return require(getFilePathByType(join(dirname(fileURLToPath(import.meta.url)), 'templates', category, template), '.json'));
}

export function getAllTemplatesAsJSON() {
  return require(getFilePathByType(join(dirname(fileURLToPath(import.meta.url)), 'templates'), '.json'));
}
