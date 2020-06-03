import 'reflect-metadata';
import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import middlewareError from '../http/middlewares/error';

import routes from './routes';
import uploadConfig from '@config/upload';

import '../typeorm/database';
import '@shared/container';

const server = express();

server.use(cors());
server.use(json());
server.use('/files', express.static(uploadConfig.uploadsFolder));
server.use(routes);
server.use(errors({ statusCode: 401 }));
server.use(middlewareError);

server.listen(3333, () => console.log('Server started on port 3333.'));

export default server;
