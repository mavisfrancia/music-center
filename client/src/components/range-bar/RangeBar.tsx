import styles from './RangeBar.module.scss';
import { Tooltip } from '../tooltip';

type Props = {
  range: number;
  alternateRange: number | null;
};

const RangeBar: React.FC<Props> = ({ range, alternateRange }) => {
  const mainRange = alternateRange ? Math.min(range, alternateRange) : range;
  const secondaryRangeExtension = alternateRange
    ? Math.abs(range - alternateRange)
    : null;

  return (
    <Tooltip
      text={
        secondaryRangeExtension
          ? `${mainRange}–${mainRange + secondaryRangeExtension}`
          : `${mainRange}`
      }
    >
      <div className={styles['range-bar']}>
        <div
          className={styles['range-bar--main']}
          style={{ minWidth: `${mainRange * 5}px` }}
        />
        {secondaryRangeExtension && (
          <div
            className={styles['range-bar--secondary']}
            style={{ minWidth: `${secondaryRangeExtension * 5}px` }}
          />
        )}
      </div>
    </Tooltip>
  );
};

export default RangeBar;
