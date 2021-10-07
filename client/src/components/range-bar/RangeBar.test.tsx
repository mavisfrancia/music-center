import { render, screen } from '@testing-library/react';
import RangeBar from './RangeBar';

describe('it displays a label describing the range values', () => {
  test('it displays a single value when only one range is provided', () => {
    const range = 9;
    render(<RangeBar range={range} alternateRange={null} />);
    expect(screen.getByText(range)).toBeInTheDocument();
  });

  test('it displays two ranges when provided', () => {
    const range = 7;
    const alternateRange = 9;
    render(<RangeBar range={range} alternateRange={alternateRange} />);
    expect(screen.getByText(`${range}–${alternateRange}`)).toBeInTheDocument();
  });

  test('it puts the smaller range first', () => {
    const range = 17;
    const alternateRange = 9;
    render(<RangeBar range={range} alternateRange={alternateRange} />);
    expect(screen.getByText(`${alternateRange}–${range}`)).toBeInTheDocument();
  });
});
