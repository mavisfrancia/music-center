import express from 'express';
import { songRepository } from '../../repositories';

const router = express.Router();

type ValidationError = {
  property: string;
  message: string;
};

router.get('/', async (req, res) => {
  try {
    const songs = await songRepository.getAllSongs();
    res.send({
      count: songs.length,
      songs,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const song = await songRepository.getSong(req.params.id);

    if (!song) {
      res.status(404).send('Song Not Found');
      return;
    }

    res.send(song);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
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
    const result = await songRepository.createSong({
      title: req.body.title,
      artist: req.body.artist,
      key: req.body.key,
    });

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
