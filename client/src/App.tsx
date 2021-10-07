import logo from './logo.svg';
import styles from './App.module.scss';
import SongList from './pages/SongList';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <nav className={styles.nav}>
          <ul className={styles['nav__item--selected']}>Songs</ul>
          <ul>Setlists</ul>
        </nav>
      </header>
      <div className={styles.content}>
        <SongList />
      </div>
    </div>
  );
}

export default App;
