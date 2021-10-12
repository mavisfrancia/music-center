import { fireEvent, render, screen } from '@testing-library/react';
import Input from './Input';

test('it can set a value', () => {
  const value = 'Something';
  render(<Input label="Test Input" value={value} onChange={jest.fn()} />);
  expect(screen.getByRole('textbox')).toHaveValue(value);
});

test('it invokes onChange', () => {
  const mockOnChange = jest.fn();
  render(<Input label="Test Input" onChange={mockOnChange} />);

  fireEvent.change(screen.getByRole('textbox'), {
    target: {
      value: 'New Value',
    },
  });

  expect(mockOnChange).toHaveBeenCalledTimes(1);
});

test('it renders a label', () => {
  const label = 'A Test Label';
  render(<Input label={label} required />);
  expect(screen.getByText(label)).toBeInTheDocument();
});

describe('required', () => {
  test('it renders "Required" if required is true', () => {
    render(<Input label="Test Input" required />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  test('it does not render "Required" if required is false', () => {
    render(<Input label="Test Input" required={false} />);
    expect(screen.queryByText('Required')).toBeNull();
  });
  
  test('it does not render "Required" by default', () => {
    render(<Input label="Test Input" />);
    expect(screen.queryByText('Required')).toBeNull();
  });
});

describe('error', () => {
  test('it renders an error', () => {
    const error = 'Something Is Wrong';
    render(<Input label="Test Input" error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  test('it favors rendering error over "Required"', () => {
    const error = 'Something Is Wrong';
    render(<Input label="Test Input" error={error} required />);
    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.queryByText('Required')).toBeNull();
  });
});
