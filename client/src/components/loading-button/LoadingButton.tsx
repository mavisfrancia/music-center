import { Loading } from '../../icons';
import { Button, ButtonProps } from '../button';

type Props = ButtonProps & {
  isLoading: boolean;
};

const LoadingButton: React.FC<Props> = ({
  children,
  isLoading,
  onClick,
  disabled,
  ...rest
}) => {
  return (
    <Button
      onClick={isLoading ? undefined : onClick}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading && <Loading testId="loading-button-icon"/>}
      {children}
    </Button>
  );
};

export default LoadingButton;
