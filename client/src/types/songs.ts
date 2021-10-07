export enum Tempo {
  FAST = 'FAST',
  MEDIUM = 'MEDIUM',
  SLOW = 'SLOW',
}

export type Song = {
  id: string;
  title: string;
  artist: string | null;
  tempo: Tempo | null;
  range: number | null;
  alternativeRange: number | null;
  key: string | null;
};

export type GetSongsResponse = {
  count: number;
  songs: Song[];
};
