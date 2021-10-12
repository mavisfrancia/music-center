import styles from './IconButton.module.scss';
import classcat from 'classcat';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label: string;
};

const IconButton: React.FC<Props> = ({
  children,
  className,
  label,
  ...rest
}) => {
  return (
    <button
      className={classcat([styles['icon-button'], className])}
      aria-label={label}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
