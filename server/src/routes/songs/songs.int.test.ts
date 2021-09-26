import { Tempo } from '../../types';
import request from 'supertest';
import app from '../../app';
import { dbClient } from '../../services';

beforeEach(async () => {
  await dbClient.song.deleteMany();
});

describe('GET /songs', () => {
  test('gets all songs', async () => {
    const initialSongs = [{ title: 'Song 1' }, { title: 'Song 2' }];
    await dbClient.song.createMany({
      data: initialSongs,
    });

    return request(app)
      .get('/songs')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.count).toBe(initialSongs.length);
        initialSongs.forEach((song) => {
          expect(response.body.songs).toContainEqual({
            id: expect.any(String),
            artist: null,
            tempo: null,
            range: null,
            alternativeRange: null,
            key: null,
            ...song,
          });
        });
      });
  });
});

describe('GET /songs/:id', () => {
  test('gets song by id', async () => {
    const testSong = await dbClient.song.create({
      data: {
        title: 'Test Song',
      },
    });

    return request(app)
      .get(`/songs/${testSong.id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(testSong);
      });
  });

  test('response with 404 error if song is not found', async () => {
    await dbClient.song.create({
      data: {
        title: 'Test Song',
      },
    });

    return request(app)
      .get(`/songs/non-existent-song-id`)
      .set('Accept', 'application/json')
      .expect(404);
  });
});

describe('POST /songs', () => {
  test('creates song', async () => {
    const testSong = {
      title: 'Test Create Song',
      artist: 'Test Artist',
      tempo: Tempo.FAST,
      range: 12,
      alternativeRange: 14,
      key: 'G',
    };

    const initialCount = await dbClient.song.count();
    expect(initialCount).toBe(0);

    await request(app)
      .post('/songs')
      .send(testSong)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject(testSong);
      });

    const finalCount = await dbClient.song.count();
    expect(finalCount).toBe(1);

    const result = await dbClient.song.findFirst();
    expect(result).toMatchObject(testSong);
  });

  test('responds with 400 error if input is invalid', async () => {
    const testSong = {
      title: 'Test Create Song',
      artist: 42,
      tempo: Tempo.FAST,
      range: 12,
      alternativeRange: 14,
      key: 'G',
    };

    const initialCount = await dbClient.song.count();
    expect(initialCount).toBe(0);

    await request(app)
      .post('/songs')
      .send(testSong)
      .set('Accept', 'application/json')
      .expect(400);

    const finalCount = await dbClient.song.count();
    expect(finalCount).toBe(0);
  });
});
