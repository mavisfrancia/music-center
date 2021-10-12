import { useEffect, useState } from 'react';
import {
  Button,
  NewSongDialog,
  RangeBar,
  SongTable,
  SongTableRow,
  TempoBadge,
} from '../components';
import styles from './SongList.module.scss';
import { Song } from '../types/songs';
import { Plus } from '../icons';
import { useSongsService } from '../services/songs';

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const songsService = useSongsService();

  useEffect(() => {
    songsService.getSongs().then((songs) => {
      setSongs(songs);
    });
  }, [songsService]);

  return (
    <div className={styles['song-list']}>
      <NewSongDialog
        isOpen={isDialogOpen}
        onDismiss={() => setIsDialogOpen(false)}
        onCreate={(song) =>
          setSongs((prev) => (prev ? [...prev, song] : [song]))
        }
      />
      <div className={styles['song-list__title-row']}>
        <h1>Songs</h1>
        <Button size="medium" onClick={() => setIsDialogOpen(true)}>
          <Plus />
          New
        </Button>
      </div>
      <SongTable>
        <thead>
          <SongTableRow heading>
            <th>Title</th>
            <th>Artist</th>
            <th>Tempo</th>
            <th>Range</th>
            <th>Key</th>
          </SongTableRow>
        </thead>
        <tbody>
          {songs &&
            songs.map(
              ({ id, title, artist, tempo, range, alternativeRange, key }) => (
                <SongTableRow key={id}>
                  <td>{title}</td>
                  <td>{artist ?? '--'}</td>
                  <td>
                    {tempo !== null ? <TempoBadge tempo={tempo} /> : '--'}
                  </td>
                  <td>
                    {range !== null ? (
                      <RangeBar
                        range={range}
                        alternativeRange={alternativeRange}
                      />
                    ) : (
                      '--'
                    )}
                  </td>
                  <td>{key ?? '--'}</td>
                </SongTableRow>
              )
            )}
        </tbody>
      </SongTable>
    </div>
  );
};

export default SongList;
