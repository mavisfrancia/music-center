import { CreateSongInput } from '../../types';
import { createSongSchema } from './validation';

describe('createSongSchema', () => {
  test('returns a song value given valid input', () => {
    const mockTitle = 'Test Song Title';

    const { error, value } = createSongSchema.validate({
      title: mockTitle,
    });
    const result = value as CreateSongInput;

    expect(error).toBeUndefined();
    expect(result.title).toBe(mockTitle);
  });
});
