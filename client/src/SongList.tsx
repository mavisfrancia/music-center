import { useEffect, useState } from "react";
import {
  Button,
  RangeBar,
  SongTable,
  SongTableRow,
  TempoBadge,
} from "./components";
import styles from "./SongList.module.scss";
import { GetSongsResponse, Song, Tempo } from "./types/songs";

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>();
  useEffect(() => {
    fetch("http://localhost:5000/songs").then(async (response) => {
      const data = (await response.json()) as GetSongsResponse;
      setSongs(data.songs);
      console.log(data);
    });
  }, []);

  return (
    <div className={styles["song-list"]}>
      <div className={styles["song-list__title-row"]}>
        <h1>Songs</h1>
        <Button>New</Button>
      </div>
      <SongTable>
        <SongTableRow heading>
          <th>Title</th>
          <th>Artist</th>
          <th>Tempo</th>
          <th>Range</th>
          <th>Key</th>
        </SongTableRow>
        {songs &&
          songs.map(
            ({ id, title, artist, tempo, range, alternativeRange, key }) => (
              <SongTableRow key={id}>
                <td>{title}</td>
                <td>{artist ?? "--"}</td>
                <td>{tempo !== null ? <TempoBadge tempo={tempo} /> : "--"}</td>
                <td>
                  {range !== null ? (
                    <RangeBar range={range} alternateRange={alternativeRange} />
                  ) : (
                    "--"
                  )}
                </td>
                <td>{key ?? "--"}</td>
              </SongTableRow>
            )
          )}
        <SongTableRow>
          <td>A Fake Title</td>
          <td>--</td>
          <td>--</td>
          <td>
            <RangeBar range={17} alternateRange={12} />
          </td>
          <td>--</td>
        </SongTableRow>
      </SongTable>
    </div>
  );
};

export default SongList;
