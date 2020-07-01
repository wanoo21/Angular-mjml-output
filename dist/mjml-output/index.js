"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mjml_1 = __importDefault(require("mjml"));
const EmailTemplate_1 = require("./EmailTemplate");
function onlyMJML(...args) {
    return new EmailTemplate_1.EmailTemplate(...args).render();
}
exports.onlyMJML = onlyMJML;
exports.default = (data, isProduction) => {
    try {
        const mjml = onlyMJML(...data);
        return Object.assign(Object.assign({}, mjml_1.default(mjml, {
            fonts: {},
            keepComments: !isProduction,
            minify: isProduction,
            beautify: !isProduction,
            validationLevel: isProduction ? 'soft' : 'strict'
        })), { mjml });
    }
    catch (error) {
        return {
            html: '',
            mjml: '',
            errors: [error.message]
        };
    }
};
