import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
// import { errorHandeler } from './middleware/error.handeler';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
// import { generateFilename } from './utils/common.util';
import path from 'path';
import fs from 'fs';
import * as uuid from 'uuid';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use('/public/assets', express.static('./public/assets'));

export default app;
