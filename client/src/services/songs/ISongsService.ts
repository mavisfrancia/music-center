import { Song } from '../../types/songs';

export interface ISongsService {
  getSongs(): Promise<Song[]>;

  createSong(data: {
    title: string;
    artist?: string;
    tempo?: string;
    range?: string;
    alternativeRange?: string;
    key?: string;
  }): Promise<Song>;
}
