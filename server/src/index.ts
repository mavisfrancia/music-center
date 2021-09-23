import express from 'express';
const app = express();
const port = 5000;
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ValidationError = {
  property: string;
  message: string;
};

app.use(express.json());

app.get('/songs', async (req, res) => {
  try {
    const songs = await prisma.song.findMany();
    res.send({
      count: songs.length,
      songs,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/songs/:id', async (req, res) => {
  try {
    const song = await prisma.song.findFirst({
      where: {
        id: req.params.id
      }
    });
    
    if (!song) {
      res.status(404).send('Song Not Found');
      return;
    }
    
    res.send(song);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/songs', async (req, res) => {
  const errors: ValidationError[] = [];

  if (!req.body.title) {
    errors.push({
      property: 'title',
      message: 'A title is required',
    });
  }

  if (req.body.artist && typeof req.body.artist !== 'string') {
    errors.push({
      property: 'artist',
      message: 'Incorrect type. Expected string',
    });
  }

  if (req.body.key && typeof req.body.key !== 'string') {
    errors.push({
      property: 'key',
      message: 'Incorrect type. Expected string',
    });
  }

  if (errors.length) {
    res.status(400).send({
      errors,
    });
    return;
  }

  try {
    const result = await prisma.song.create({
      data: {
        title: req.body.title,
        artist: req.body.artist,
        key: req.body.key,
      },
    });

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
