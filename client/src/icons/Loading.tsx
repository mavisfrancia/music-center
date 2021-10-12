import styles from './Loading.module.scss';

type Props = {
  testId?: string;
};

const Loading: React.FC<Props> = ({ testId }) => {
  return (
    <div className={styles.loading} data-testid={testId}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 8C15 11.866 11.866 15 8 15V16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8H1C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Loading;
