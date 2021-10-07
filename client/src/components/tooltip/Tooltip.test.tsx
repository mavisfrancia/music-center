import { render, screen } from '@testing-library/react';
import Tooltip from './Tooltip';

test('it renders children', () => {
  const containedText = 'My Test Div';
  render(
    <Tooltip text="Tooltip text">
      <div>{containedText}</div>
    </Tooltip>
  );
  expect(screen.getByText(containedText)).toBeInTheDocument();
});

test('it displays tooltip text', () => {
  const tooltipText = 'Tooltip text';
  const containedText = 'My Test Div';
  render(
    <Tooltip text={tooltipText}>
      <div>{containedText}</div>
    </Tooltip>
  );
  expect(screen.getByText(tooltipText)).toBeInTheDocument();
});
