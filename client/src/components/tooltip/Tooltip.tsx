import React from 'react';
import styles from './Tooltip.module.scss';

type Props = {
  text: string;
};

const Tooltip: React.FC<Props> = ({ children, text }) => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.tooltip}>{text}</div>
    </div>
  );
};

export default Tooltip;
