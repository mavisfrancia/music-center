import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { SongsServiceProvider } from '../../services/songs';
import { Tempo } from '../../types/songs';
import NewSongDialog from './NewSongDialog';

describe('title', () => {
  test('it disables create button while title is empty', () => {
    render(
      <SongsServiceProvider
        value={{
          createSong: jest.fn(),
          getSongs: jest.fn(),
        }}
      >
        <NewSongDialog
          isOpen={true}
          onDismiss={jest.fn()}
          onCreate={jest.fn()}
        />
      </SongsServiceProvider>
    );
    expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
  });

  test('it enables create button when title is filled out', async () => {
    render(
      <SongsServiceProvider
        value={{
          createSong: jest.fn(),
          getSongs: jest.fn(),
        }}
      >
        <NewSongDialog
          isOpen={true}
          onDismiss={jest.fn()}
          onCreate={jest.fn()}
        />
      </SongsServiceProvider>
    );
    const titleInput = screen.getByRole('textbox', { name: 'Title' });
    userEvent.type(titleInput, 'A Song Title');
    fireEvent.blur(titleInput);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Create' })).not.toBeDisabled();
    });
  });
});

describe('range', () => {
  test.each([[-1], [0], [1.1]])(
    'it disables create button and displays an error when range is invalid',
    async (invalidValue) => {
      render(
        <SongsServiceProvider
          value={{
            createSong: jest.fn(),
            getSongs: jest.fn(),
          }}
        >
          <NewSongDialog
            isOpen={true}
            onDismiss={jest.fn()}
            onCreate={jest.fn()}
          />
        </SongsServiceProvider>
      );
      const titleInput = screen.getByRole('textbox', { name: 'Title' });
      userEvent.type(titleInput, 'A Song Title');
      fireEvent.blur(titleInput);
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Create' })
        ).not.toBeDisabled();
      });

      const rangeInput = screen.getByRole('spinbutton', { name: 'Range' });
      userEvent.type(rangeInput, `${invalidValue}`);
      fireEvent.blur(rangeInput);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
        expect(
          screen.getByText('Please enter a positive integer')
        ).toBeInTheDocument();
      });
    }
  );
});

describe('alternative range', () => {
  test.each([[-1], [0], [1.1]])(
    'it disables create button and displays an error when alternative range is invalid',
    async (invalidValue) => {
      render(
        <SongsServiceProvider
          value={{
            createSong: jest.fn(),
            getSongs: jest.fn(),
          }}
        >
          <NewSongDialog
            isOpen={true}
            onDismiss={jest.fn()}
            onCreate={jest.fn()}
          />
        </SongsServiceProvider>
      );
      const titleInput = screen.getByRole('textbox', { name: 'Title' });
      userEvent.type(titleInput, 'A Song Title');
      fireEvent.blur(titleInput);
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Create' })
        ).not.toBeDisabled();
      });

      const rangeInput = screen.getByRole('spinbutton', { name: 'Range' });
      userEvent.type(rangeInput, '12');
      fireEvent.blur(rangeInput);

      const alternativeRangeInput = screen.getByRole('spinbutton', {
        name: 'Alternative Range',
      });
      userEvent.type(alternativeRangeInput, `${invalidValue}`);
      fireEvent.blur(alternativeRangeInput);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
        expect(
          screen.getByText('Please enter a positive integer')
        ).toBeInTheDocument();
      });
    }
  );
});

test('it creates a song on submit', async () => {
  const expectedSong = {
    title: 'My Test Song',
    artist: 'An Artist',
    tempo: Tempo.MEDIUM,
    range: 12,
    alternativeRange: 14,
    key: 'Bb',
  };
  const mockCreateSong = jest.fn(() =>
    Promise.resolve({
      ...expectedSong,
      id: 'some-id',
    })
  );
  render(
    <SongsServiceProvider
      value={{
        createSong: mockCreateSong,
        getSongs: jest.fn(),
      }}
    >
      <NewSongDialog isOpen={true} onDismiss={jest.fn()} onCreate={jest.fn()} />
    </SongsServiceProvider>
  );
  userEvent.type(
    screen.getByRole('textbox', { name: 'Title' }),
    expectedSong.title
  );
  userEvent.type(
    screen.getByRole('textbox', { name: 'Artist' }),
    expectedSong.artist
  );
  userEvent.type(
    screen.getByRole('spinbutton', { name: 'Range' }),
    `${expectedSong.range}`
  );
  userEvent.type(
    screen.getByRole('spinbutton', { name: 'Alternative Range' }),
    `${expectedSong.alternativeRange}`
  );
  fireEvent.change(screen.getByRole('combobox', { name: 'Tempo' }), {
    target: { value: Tempo.MEDIUM },
  });
  userEvent.type(
    screen.getByRole('textbox', { name: 'Key' }),
    expectedSong.key
  );

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Create' })).not.toBeDisabled();
  });

  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: 'Create' }));
  });

  expect(mockCreateSong).toHaveBeenCalledWith({
    ...expectedSong,
    range: `${expectedSong.range}`,
    alternativeRange: `${expectedSong.alternativeRange}`,
  });
});
