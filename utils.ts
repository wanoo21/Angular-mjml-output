import { join } from 'path'
import { readdirSync } from 'fs'

export function getDirectoriesNames(directory: string) {
  return readdirSync(directory, { withFileTypes: true })
    .filter(dir => dir.isDirectory()).map(({ name }) => name)
}

export function getFilePathByType(directory: string, type: string) {
  const file = readdirSync(directory, { withFileTypes: true }).filter(file => {
    return file.isFile() && file.name.endsWith(type)
  }).map(({ name }) => name)
  return `${directory}/${file}`
}

export function getEmailJSON(category: string, template: string) {
  return getFilePathByType(join(__dirname, 'templates', category, template), '.json');
}
