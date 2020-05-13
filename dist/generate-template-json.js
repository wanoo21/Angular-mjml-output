"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utils_1 = require("./utils");
const templates = utils_1.getDirectoriesNames('./templates').map(category => {
    return {
        category,
        templates: utils_1.getDirectoriesNames(`./templates/${category}`)
    };
});
fs_1.writeFileSync('./templates/templates.json', JSON.stringify(templates));
console.log('Done');
