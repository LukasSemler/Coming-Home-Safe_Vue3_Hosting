import express from 'express';
import morgan from 'morgan';

import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { ErrorHandler, NotFoundHandler } from './Middleware/index.js';
import wsServer from './websockets/index.js';
import wsclient from 'websocket';

import routes from './Router/routes.js';

dotenv.config();

const dirname = path.resolve();
const app = express();

const PORT = process.env.PORT || 2410;

app.use(morgan('dev'));
// app.use(helmet()); //Brauchen wir nicht, da sonst die Mapbox nicht mehr geht
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(dirname, '/public')));
app.use(express.json());

//Immer auf HTTPS weiterleiten
app.use((req, res, next) => {
  if (req.headers.host === 'localhost:2410') return next();

  return res.redirect('https://' + req.headers.host + req.url);
});

app.use('/', routes);

app.use(ErrorHandler);
app.use(NotFoundHandler);

const http = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//WebsocketServer
wsServer(http);
