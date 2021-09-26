import express from 'express';
import { songs } from '$routes';

const app = express();

app.use(express.json());

app.use('/songs', songs);

export default app;
