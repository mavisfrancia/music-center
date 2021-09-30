import styles from "./Button.module.scss";
import { Plus } from "../../icons";

const Button: React.FC = ({ children, ...rest }) => {
  return (
    <button className={styles.button} {...rest}>
      <Plus />
      {children}
    </button>
  );
};

export default Button;
