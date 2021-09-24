import { CreateSongInput } from '../types';
import { dbClient } from '../services';

export const getAllSongs = () => dbClient.song.findMany();

export const getSong = (id: string) =>
  dbClient.song.findFirst({
    where: {
      id,
    },
  });

export const createSong = (song: CreateSongInput) =>
  dbClient.song.create({
    data: song,
  });
