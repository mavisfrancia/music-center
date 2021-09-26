import { Tempo } from '../../types';
import { createSongSchema } from './validation';

describe('validate createSongSchema', () => {
  test('given valid input, returns value matching the input and no error', () => {
    const mockSong = {
      title: 'Mock Song Title',
      artist: 'Mock Artist',
      tempo: Tempo.FAST,
      range: 10,
      alternativeRange: 11,
      key: 'C',
    };

    const { error, value } = createSongSchema.validate(mockSong);

    expect(error).toBeUndefined();
    expect(value).toEqual(mockSong);
  });

  test('given input with extraneous property, returns an error', () => {
    const extraneousProperty = 'foo';
    const mockSong = {
      title: 'Mock Song Title',
      artist: 'Mock Artist',
      tempo: Tempo.FAST,
      range: 10,
      alternativeRange: 11,
      key: 'C',
      [extraneousProperty]: 'bar',
    };

    const { error } = createSongSchema.validate(mockSong);

    expect(error.message).toBe(`"${extraneousProperty}" is not allowed`);
  });

  describe('title', () => {
    test('given input with missing title, returns an error', () => {
      const mockSong = {
        artist: 'Mock Artist',
        tempo: Tempo.FAST,
        range: 10,
        alternativeRange: 11,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error).toBeDefined();
      expect(error.message).toBe('"title" is required');
    });

    test('given invalid title type, returns an error', () => {
      const mockSong = {
        title: true,
        artist: 'Mock Artist',
        tempo: Tempo.FAST,
        range: 10,
        alternativeRange: 11,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error).toBeDefined();
      expect(error.message).toBe('"title" must be a string');
    });
  });

  describe('artist', () => {
    test('given invalid artist type, returns an error', () => {
      const mockSong = {
        title: 'Mock Song Title',
        artist: ['Mock Artist'],
        tempo: Tempo.FAST,
        range: 10,
        alternativeRange: 11,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error).toBeDefined();
      expect(error.message).toBe('"artist" must be a string');
    });
  });

  describe('tempo', () => {
    test('given tempo with different casing, returns value with normalized tempo', () => {
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: 'mEdIuM',
        range: 10,
        alternativeRange: 11,
        key: 'C',
      };

      const { value } = createSongSchema.validate(mockSong);

      expect(value.tempo).toBe(Tempo.MEDIUM);
    });

    test('given unsupported tempo, returns an error', () => {
      const validTempos = Object.values(Tempo).join(', ');
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: 'Really Fast',
        range: 10,
        alternativeRange: 11,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error.message).toBe(`"tempo" must be one of [${validTempos}]`);
    });

    test('given invalid tempo type, returns an error', () => {
      const validTempos = Object.values(Tempo).join(', ');
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: 120,
        range: 10,
        alternativeRange: 11,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error).toBeDefined();
      expect(error.message).toBe(`"tempo" must be one of [${validTempos}]`);
    });
  });

  describe('range', () => {
    test('given range less than 1, returns an error', () => {
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: Tempo.FAST,
        range: 0,
        alternativeRange: 11,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error.message).toBe(`"range" must be greater than or equal to 1`);
    });

    test('given invalid range type, returns an error', () => {
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: Tempo.FAST,
        range: 'seventeen semitones',
        alternativeRange: 11,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error.message).toBe(`"range" must be a number`);
    });
  });

  describe('alternativeRange', () => {
    test('given alternativeRange but no range, returns an error', () => {
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: Tempo.FAST,
        alternativeRange: 11,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error.message).toBe(
        '"alternativeRange" is not allowed unless a "range" is also provided'
      );
    });

    test('given alternativeRange less than 1, returns an error', () => {
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: Tempo.FAST,
        range: 10,
        alternativeRange: 0,
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error.message).toBe(
        `"alternativeRange" must be greater than or equal to 1`
      );
    });

    test('given invalid alternativeRange type, returns an error', () => {
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: Tempo.FAST,
        range: 10,
        alternativeRange: 'eleven',
        key: 'C',
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error.message).toBe('"alternativeRange" must be a number');
    });
  });

  describe('key', () => {
    test('given invalid key type, returns an error', () => {
      const mockSong = {
        title: 'Mock Song Title',
        artist: 'Mock Artist',
        tempo: Tempo.FAST,
        range: 10,
        alternativeRange: 11,
        key: 7,
      };

      const { error } = createSongSchema.validate(mockSong);

      expect(error).toBeDefined();
      expect(error.message).toBe('"key" must be a string');
    });
  });
});
