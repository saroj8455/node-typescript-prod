import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as uuid from 'uuid';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import { generateFilename } from './utils/common.utils';
import { errorHandeler } from './middleware/error.middleware';
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use('/public/assets', express.static('./public/assets'));

// For File upload
// Testing
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a logs directory (if it doesn't exist)
const logsFolder = path.join(path.resolve(), '/logs');
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}
// Setup logs
// Create a write stream (to append logs to a file)
const filename = generateFilename();
const accessLogStream = fs.createWriteStream(path.join(logsFolder, filename), {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));

// Capture Image soure for all
app.post(
  '/capture-global',
  upload.single('captureImage'),
  async (req: Request, res: Response, next: NextFunction) => {
    fs.access('./public/assets', (error) => {
      if (error) {
        fs.mkdirSync('./public/assets');
      }
    });
    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).jsonp({
        message: 'No file uploaded.',
      });
    }
    try {
      // Receive file and process for upload with new filename
      const { buffer, originalname } = file;
      const timestamp = new Date().toISOString();
      const port = process.env.PORT;
      const ref = `${uuid.v4()}-${timestamp}-${originalname}.webp`;
      await sharp(buffer)
        .webp({ quality: 20 })
        .toFile('./public/assets/' + ref);
      const link = `http://localhost:${port}/public/assets/${ref}`;
      return res.status(StatusCodes.ACCEPTED).json({ link });
      // res.status(StatusCodes.OK).jsonp({
      //   message: 'Image Captured Successfully',
      // });
    } catch (error) {
      next(error);
    }
  }
);

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Error simulate by express server.');
  // Send error to next middleware
  next(error);
});

// Errorhandeler middleware
app.use(errorHandeler);

export default app;
