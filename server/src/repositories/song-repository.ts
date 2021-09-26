import { CreateSongInput, Song } from '$types';
import { dbClient } from '$services';

export const getAllSongs = (): Promise<Song[]> => dbClient.song.findMany();

export const getSong = (id: string): Promise<Song> =>
  dbClient.song.findFirst({
    where: {
      id,
    },
  });

export const createSong = (song: CreateSongInput): Promise<Song> =>
  dbClient.song.create({
    data: song,
  });
