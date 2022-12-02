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
// app.use(helmet());
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

wsServer(http);

// const wsTest = WebSockett('ws://localhost:2410', '');
const wsKeepAlive = new wsclient.client();
wsKeepAlive.connect('ws://localhost:2410');
wsKeepAlive.on('connect', (connection) => {
  setInterval(() => {
    connection.send(JSON.stringify({ type: 'IamAlive', daten: '' }));
  }, 1000);
});
