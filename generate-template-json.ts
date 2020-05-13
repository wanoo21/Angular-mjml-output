import { writeFileSync } from 'fs'
import { getDirectoriesNames } from './utils';

const templates = getDirectoriesNames('./templates').map(category => {
  return {
    category,
    templates: getDirectoriesNames(`./templates/${category}`)
  }
})

writeFileSync('./templates/templates.json', JSON.stringify(templates))

console.log('Done');
