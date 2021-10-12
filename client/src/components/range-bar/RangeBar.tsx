import styles from './RangeBar.module.scss';
import { Tooltip } from '../tooltip';

type Props = {
  range: number;
  alternativeRange: number | null;
};

const RangeBar: React.FC<Props> = ({ range, alternativeRange }) => {
  const mainRange = alternativeRange ? Math.min(range, alternativeRange) : range;
  const secondaryRangeExtension = alternativeRange
    ? Math.abs(range - alternativeRange)
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
