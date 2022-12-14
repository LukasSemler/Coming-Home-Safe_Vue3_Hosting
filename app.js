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

//WebsocketServer
wsServer(http);

//! KANN MAN EIGENTLICH WEGLÖSCHE
//Pseudo Keep alive WS-Client
// let wsKeepAliveClient = new wsclient.client();
// wsKeepAliveClient.connect(
//   process.env.PORT == 2410 ? 'ws://localhost:2410' : 'wss://chstest.onrender.com',
//   'KeepAliveClient',
// );
// wsKeepAliveClient.on('connect', (event) => {
//   setInterval(() => {
//     // event.send(JSON.stringify({ type: 'IamAlive', daten: `Hello World` }));
//   }, 1000);
// });  
