import {createReadStream, readFileSync} from 'node:fs';
import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {convertIPEmail, getFilePathByType, onlyMJML} from './index';
import {convertMjmlToIpEmail} from './mjml-to-email';

const {NODE_ENV, PORT} = process.env;
const isProduction = NODE_ENV === 'production';
const app = express();

app.disable('etag').disable('x-powered-by');

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(cors());

app.set('port', PORT || 3000);
app.set('isProduction', isProduction);

app.post('/', (req: Request, res: Response) => {
    // Check api key, just to emulate AWS forbidden response
    // const apiKey = req.get('x-api-key');
    // if (!apiKey) {
    //   res.status(403).end();
    // } else {
    // const { email, googleFonts } = req.body;
    const output = convertIPEmail(req.body, isProduction);
    res.json(output);
    // }
});

app.post('/mjml', (req: Request, res: Response) => {
    // const { email, googleFonts } = req.body;
    const mjml = onlyMJML(req.body);
    res.json({mjml});
});

app.get('/to-object', (req: Request, res: Response) => {
    const testMjml = readFileSync(getFilePathByType(`./templates/ecommerce/e-shop`, `.mjml`), {encoding: 'utf-8'})
    const ipEmail = convertMjmlToIpEmail(testMjml);
    res.json(ipEmail);
});

app.get('/test/:category/:name', (req: Request, res: Response) => {
    const {category, name} = req.params
    try {
        const file = readFileSync(getFilePathByType(`./templates/${category}/${name}`, `.json`), {encoding: 'utf-8'})
        const {html} = convertIPEmail(JSON.parse(file), true)
        res.send(html)
    } catch (error) {
        res.status(404).json({error: 'Template not found.'})
    }
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('PONG');
});

// app.get('/templates/:category/images/:img', (req: Request, res: Response) => {
//   const { category, img } = req.params
//   try {
//     const [templateFolder] = getDirectoriesNames(`./templates/${category}`).filter(
//       templateFolder => getFilePathByType(`./templates/${category}/${templateFolder}/images`, img)
//     )
//     if (!templateFolder || !existsSync(`./templates/${category}/${templateFolder}/images/${img}`)) {
//       throw new Error('Template not found.')
//     }
//     createReadStream(`./templates/${category}/${templateFolder}/images/${img}`).pipe(res)
//   } catch (error) {
//     console.log(error);
//     res.status(404).end()
//   }
// });

app.get('/templates', (req: Request, res: Response) => {
    createReadStream('./templates/templates.json').pipe(res)
});

app.get('/templates/:category/:name', (req: Request, res: Response) => {
    const {category, name} = req.params
    const {type = 'json'} = req.query
    try {
        const file = getFilePathByType(`./templates/${category}/${name}`, `.${type}`)
        createReadStream(file).pipe(res)
    } catch (error) {
        res.json({error: 'Template not found.'})
    }
});

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Server running on port', app.get('port'));
});
