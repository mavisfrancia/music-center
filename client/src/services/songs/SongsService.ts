import { CreateSongResponse, GetSongsResponse, Song } from '../../types/songs';
import { ISongsService } from './ISongsService';
import environment from '../../environment';

export class SongsService implements ISongsService {
  getSongs(): Promise<Song[]> {
    return fetch(`${environment.API_ENDPOINT}/songs`).then(async (response) => {
      const data = (await response.json()) as GetSongsResponse;
      return data.songs;
    });
  }

  createSong(data: {
    title: string;
    artist?: string;
    tempo?: string;
    range?: string;
    alternativeRange?: string;
    key?: string;
  }): Promise<Song> {
    return fetch(`${environment.API_ENDPOINT}/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        artist: data.artist || undefined,
        tempo: data.tempo || undefined,
        range: data.range || undefined,
        alternativeRange: data.alternativeRange || undefined,
        key: data.key || undefined,
      }),
    }).then(async (response) => {
      const data = (await response.json()) as CreateSongResponse;
      return data;
    });
  }
}
