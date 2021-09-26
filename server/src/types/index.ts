import { Prisma, Tempo, Song } from '@prisma/client';

type CreateSongInput = Prisma.SongCreateInput;

export { CreateSongInput, Tempo, Song };
