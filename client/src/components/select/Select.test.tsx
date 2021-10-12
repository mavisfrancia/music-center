import Select from './Select';

import { fireEvent, render, screen } from '@testing-library/react';

test('it can set a value', () => {
  const value = 'Something';
  render(
    <Select label="Test Input" value={value} onChange={jest.fn()}>
      <option value="A Different Value">Different Option</option>
      <option value={value}>Something Option</option>
    </Select>
  );
  expect(screen.getByRole('combobox')).toHaveValue(value);
});

test('it selects label option when value is empty', () => {
  const selectLabel = 'Select Label';
  render(<Select label={selectLabel} value={''} onChange={jest.fn()} />);
  expect(screen.getByDisplayValue(selectLabel)).toBeInTheDocument();
});

test('it invokes onChange', () => {
  const mockOnChange = jest.fn();
  render(<Select label="Test Input" onChange={mockOnChange} />);

  fireEvent.change(screen.getByRole('combobox'), {
    target: {
      value: 'New Value',
    },
  });

  expect(mockOnChange).toHaveBeenCalledTimes(1);
});

test('it renders a label', () => {
  const label = 'A Test Label';
  render(<Select label={label} required />);
  expect(screen.getByLabelText(label)).toBeInTheDocument();
});

describe('required', () => {
  test('it renders "Required" if required is true', () => {
    render(<Select label="Test Input" required />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  test('it does not render "Required" if required is false', () => {
    render(<Select label="Test Input" required={false} />);
    expect(screen.queryByText('Required')).toBeNull();
  });

  test('it does not render "Required" by default', () => {
    render(<Select label="Test Input" />);
    expect(screen.queryByText('Required')).toBeNull();
  });
});

describe('error', () => {
  test('it renders an error', () => {
    const error = 'Something Is Wrong';
    render(<Select label="Test Input" error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  test('it favors rendering error over "Required"', () => {
    const error = 'Something Is Wrong';
    render(<Select label="Test Input" error={error} required />);
    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.queryByText('Required')).toBeNull();
  });
});
