import express from 'express';
import cors from 'cors';
import 'dotenv';

var app = express();

app.use(express.json());

app.listen(process.env.APPLICATION_PORT, () => {
  console.log('Server is running');
});
