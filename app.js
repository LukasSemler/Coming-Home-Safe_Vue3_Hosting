import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { ErrorHandler, NotFoundHandler } from './Middleware/index.js';
import wsServer from './websockets/index.js';

import routes from './Router/routes.js';
import redirectSSL from 'redirect-ssl';

dotenv.config();

const dirname = path.resolve();
const app = express();

const PORT = process.env.PORT || 2410;

app.use(redirectSSL); //Redirect von http auf https
app.use(morgan('dev'));
// app.use(helmet()); //Brauchen wir nicht, da sonst die Mapbox nicht mehr geht
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(dirname, '/public')));
app.use(express.json());

app.use('/', routes);

app.use(ErrorHandler);
app.use(NotFoundHandler);

const http = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//WebsocketServer
wsServer(http);
