import { render, screen } from '@testing-library/react';
import LoadingButton from './LoadingButton';

describe('loading icon', () => {
  test('renders loading icon when isLoading is true', () => {
    render(<LoadingButton isLoading size="large" />);
    expect(screen.getByTestId('loading-button-icon')).toBeInTheDocument();
  });
  
  test('does not render loading icon when isLoading is false', () => {
    render(<LoadingButton isLoading={false} size="large" />);
    expect(screen.queryByTestId('loading-button-icon')).toBeNull();
  });
});
