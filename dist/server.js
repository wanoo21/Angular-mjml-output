"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const utils_1 = require("./utils");
const mjml_output_1 = __importStar(require("./mjml-output"));
const { NODE_ENV, PORT } = process.env;
const isProduction = NODE_ENV === 'production';
const app = express_1.default();
app.disable('etag').disable('x-powered-by');
app.use(cors_1.default());
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.set('port', PORT || 3002);
app.set('isProduction', isProduction);
app.post('/', (req, res) => {
    const apiKey = req.get('x-api-key');
    if (!apiKey) {
        res.status(403).end();
    }
    else {
        const output = mjml_output_1.default(req.body, isProduction);
        res.json(output);
    }
});
app.post('/mjml', (req, res) => {
    const mjml = mjml_output_1.onlyMJML(req.body);
    res.json({ mjml });
});
app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.get('/templates/:category/images/:img', (req, res) => {
    const { category, img } = req.params;
    try {
        const [templateFolder] = utils_1.getDirectoriesNames(`./templates/${category}`).filter(templateFolder => utils_1.getFilePathByType(`./templates/${category}/${templateFolder}/images`, img));
        if (!templateFolder || !fs_1.existsSync(`./templates/${category}/${templateFolder}/images/${img}`)) {
            throw new Error('Template not found.');
        }
        fs_1.createReadStream(`./templates/${category}/${templateFolder}/images/${img}`).pipe(res);
    }
    catch (error) {
        console.log(error);
        res.status(404).end();
    }
});
app.get('/templates', (req, res) => {
    fs_1.createReadStream('./templates/templates.json').pipe(res);
});
app.get('/templates/:category/:name', (req, res) => {
    const { category, name } = req.params;
    const { type = 'json' } = req.query;
    try {
        const file = utils_1.getFilePathByType(`./templates/${category}/${name}`, `.${type}`);
        fs_1.createReadStream(file).pipe(res);
    }
    catch (error) {
        res.json({ error: 'Template not found.' });
    }
});
app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server running on port', app.get('port'));
});
