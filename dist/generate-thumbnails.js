"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const webshot_1 = __importDefault(require("webshot"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mjml_1 = __importDefault(require("mjml"));
const templates_json_1 = __importDefault(require("./templates/templates.json"));
const utils_1 = require("./utils");
const access = util_1.promisify(fs_1.default.access);
const mkdir = util_1.promisify(fs_1.default.mkdir);
const TEMPLATES_FOLDER = path_1.default.join(__dirname, 'templates');
const THUMB_FOLDER = path_1.default.join(__dirname, 'thumbnails');
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
};
async function isWritableOrCreate(folder) {
    try {
        await access(folder, fs_1.default.constants.R_OK | fs_1.default.constants.W_OK);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            await mkdir(folder);
        }
        else {
            throw err;
        }
    }
}
async function generateThumbnail(category, template) {
    const thumbName = path_1.default.join(THUMB_FOLDER, `${category}-${template}.jpg`);
    if (fs_1.default.existsSync(thumbName)) {
        return Promise.resolve();
    }
    console.log(` > Creating ${category}/${template}`);
    const mjml = fs_1.default.readFileSync(utils_1.getFilePathByType(path_1.default.join(TEMPLATES_FOLDER, category, template), '.mjml'), { encoding: 'utf-8' });
    const html = await getHTML(mjml);
    await shot(thumbName, html);
}
function getHTML(mjml) {
    return new Promise((resolve, reject) => {
        try {
            const res = mjml_1.default(mjml);
            resolve(res.html);
        }
        catch (err) {
            reject(err);
        }
    });
}
function shot(name, html) {
    return new Promise((resolve, reject) => {
        webshot_1.default(html, name, WEBSHOT_OPTIONS, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
(async function () {
    try {
        await isWritableOrCreate(THUMB_FOLDER);
        console.log('>> Generating thumbnails');
        await templates_json_1.default.reduce((promise, { templates, category }) => {
            return promise.then(() => templates.reduce((promise2, template) => {
                return promise2.then(() => generateThumbnail(category, template));
            }, Promise.resolve()));
        }, Promise.resolve());
    }
    catch (err) {
        console.log('> Something went wrong');
        console.log(err.message || err);
        process.exit(1);
    }
})();
