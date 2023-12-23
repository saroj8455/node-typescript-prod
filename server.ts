import * as dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcryptjs';

// Configuration ENV
dotenv.config();

const PORT = process.env.PORT || 4000;

const connectToDB = async () => {
  try {
    // Connect to MongoDB database
    const connectionUrl = process.env.REMOTEURI ? process.env.REMOTEURI : '';
    const conn = await mongoose.connect(connectionUrl);
    console.log(`Connected to Remote Host : ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log('Unable to Connect Remote DB', error);
  }
};

connectToDB();

app.get('/', async (req: Request, res: Response) => {
  try {
    const conn = await connectToDB();
    // Caste to string
    const hostname = conn?.connection.host as string;
    const encyHost = await bcrypt.hash(hostname, 10);

    return res.status(StatusCodes.OK).jsonp({
      message: `⚡ 🖥️ Server is running here 👉 http://localhost:${PORT}`,
      status: `${encyHost}`,
      watchStatus: 'App is watching mode.',
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).jsonp({
      message: '🖥️ Internal Server Error!',
      status: false,
    });
  }
});

app.listen(PORT, () =>
  console.log(`⚡Server is running here 👉 http://localhost:${PORT}`)
);
