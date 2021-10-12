import classcat from 'classcat';
import styles from './Button.module.scss';

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size: 'medium' | 'large';
};

const Button: React.FC<Props> = ({ size, children, ...rest }) => {
  return (
    <button
      className={classcat([
        styles.button,
        { [styles['button--large']]: size === 'large' },
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
