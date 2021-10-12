import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

test('it renders children', () => {
  const text = 'Button Label';
  render(<Button size="large">{text}</Button>);
  expect(screen.getByText(text)).toBeInTheDocument();
});

test('it invokes click handler', () => {
  const mockOnClick = jest.fn();
  render(
    <Button size="medium" onClick={mockOnClick}>
      Test Button
    </Button>
  );
  fireEvent.click(screen.getByRole('button'));
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
