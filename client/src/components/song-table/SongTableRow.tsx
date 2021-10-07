import classcat from 'classcat';
import styles from './SongTableRow.module.scss';

type Props = {
  heading?: boolean;
};

const TableRow: React.FC<Props> = ({ heading = false, children }) => {
  const className = classcat([
    styles['table-row'],
    { [styles['table-row--heading']]: heading },
  ]);

  return <tr className={className}>{children}</tr>;
};

export default TableRow;
