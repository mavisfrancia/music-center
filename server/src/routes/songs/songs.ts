import express from 'express';
import { songRepository } from '../../repositories';
import { CreateSongInput } from '../../types';
import { createSongSchema } from './validation';

const router = express.Router();

router.get('/', async (_, res) => {
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
  const { error, value } = createSongSchema.validate(req.body);

  if (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
    return;
  }

  const validSong = value as CreateSongInput;

  console.log(validSong.foo);

  try {
    const result = await songRepository.createSong(validSong);

    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
