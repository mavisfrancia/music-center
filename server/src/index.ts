import express from 'express';
import { songs } from './routes';
const port = 5000;

const app = express();

app.use(express.json());

app.use('/songs', songs);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
