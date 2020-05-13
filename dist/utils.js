"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function getDirectoriesNames(directory) {
    return fs_1.readdirSync(directory, { withFileTypes: true })
        .filter(dir => dir.isDirectory()).map(({ name }) => name);
}
exports.getDirectoriesNames = getDirectoriesNames;
function getFilePathByType(directory, type) {
    const file = fs_1.readdirSync(directory, { withFileTypes: true }).filter(file => {
        return file.isFile() && file.name.endsWith(type);
    }).map(({ name }) => name);
    return `${directory}/${file}`;
}
exports.getFilePathByType = getFilePathByType;
