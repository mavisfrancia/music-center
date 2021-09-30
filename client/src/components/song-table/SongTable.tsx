import styles from "./SongTable.module.scss";

const Table: React.FC = ({ children }) => {
  return <table className={styles.table}>{children}</table>;
};

export default Table;
