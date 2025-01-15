import {dirname, join} from 'node:path'
import {readdirSync} from 'node:fs'
import {fileURLToPath} from "node:url";

/**
 * Get the directories names
 *
 * Properly works only in Node.js environment
 * @param directory
 */
export function getDirectoriesNames(directory: string) {
  return readdirSync(directory, {withFileTypes: true})
  .filter(dir => dir.isDirectory()).map(({name}) => name)
}

/**
 * Get the file path by type
 *
 * Properly works only in Node.js environment
 * @param directory
 * @param type
 */
export function getFilePathByType(directory: string, type: string) {
  const file = readdirSync(directory, {withFileTypes: true}).filter(file => {
    return file.isFile() && file.name.endsWith(type)
  }).map(({name}) => name)
  return `${directory}/${file}`
}

/**
 * Get the email template as JSON by category and template name
 *
 * Properly works only in Node.js environment
 * @param category Category
 * @param template Template name
 */
export function getEmailJSON(category: string, template: string) {
  return require(getFilePathByType(join(dirname(fileURLToPath(import.meta.url)), 'templates', category, template), '.json'));
}

/**
 * Get all email templates as JSON
 *
 * Properly works only in Node.js environment
 */
export function getAllTemplatesAsJSON() {
  return require(getFilePathByType(join(dirname(fileURLToPath(import.meta.url)), 'templates'), '.json'));
}
