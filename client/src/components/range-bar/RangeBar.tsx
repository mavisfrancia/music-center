import styles from "./RangeBar.module.scss";

type Props = {
  range: number;
  alternateRange: number | null;
};

const RangeBar: React.FC<Props> = ({ range, alternateRange }) => {
  const mainRange = alternateRange ? Math.min(range, alternateRange) : range;
  const secondaryRange = alternateRange
    ? Math.max(range, alternateRange)
    : null;

  return (
    <div className={styles["range-bar"]}>
      {secondaryRange !== null && (
        <div
          className={styles["range-bar--secondary"]}
          style={{ minWidth: `${secondaryRange * 5}px` }}
        />
      )}
      <div
        className={styles["range-bar--main"]}
        style={{ minWidth: `${mainRange * 5}px` }}
      />
    </div>
  );
};

export default RangeBar;
