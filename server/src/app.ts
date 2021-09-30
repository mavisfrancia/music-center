import express from 'express';
import cors from 'cors';
import { songs } from '$routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/songs', songs);

export default app;
