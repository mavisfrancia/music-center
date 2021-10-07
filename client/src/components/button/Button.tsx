import styles from './Button.module.scss';
import { Plus } from '../../icons';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <button className={styles.button} {...rest}>
      <Plus />
      {children}
    </button>
  );
};

export default Button;
