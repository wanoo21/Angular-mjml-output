import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { Request, Response } from 'express';
import { IIPDefaultEmail } from 'mjml-output/interfaces';
import mjmlOutput, { onlyMJML } from './mjml-output';

const { NODE_ENV, PORT } = process.env;

const isProduction = NODE_ENV === 'production';

const app = express();

app.disable('etag').disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.set('port', PORT || 3002);
app.set('isProduction', isProduction);

app.post('/', (req: Request, res: Response) => {
  // Check api key, just to emulate AWS forbiddden response
  const apiKey = req.get('x-api-key');
  if (!apiKey) {
    res.status(403).end();
  } else {
    const output = mjmlOutput(<IIPDefaultEmail>req.body, isProduction);
    res.json(output);
  }
});

app.post('/mjml', (req: Request, res: Response) => {
  const mjml = onlyMJML(<IIPDefaultEmail>req.body);
  res.json({ mjml });
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('PONG');
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('Server running on port', app.get('port'));
});
