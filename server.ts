import * as dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';

// Configuration ENV
dotenv.config();

const PORT = process.env.PORT || 4000;

const connectToDB = async () => {
  try {
    // Connect to MongoDB database
    const connectionUrl = process.env.REMOTEURI ? process.env.REMOTEURI : '';
    const conn = await mongoose.connect(connectionUrl);
    console.log(`Connected to Remote Host : ${conn.connection.host}`);
  } catch (error) {
    console.log('Unable to Connect Remote DB', error);
  }
};

connectToDB();

app.get('/', (req, res) => res.send('Hello from server!'));

app.listen(PORT, () =>
  console.log(`⚡Server is running here 👉 http://localhost:${PORT}`)
);
