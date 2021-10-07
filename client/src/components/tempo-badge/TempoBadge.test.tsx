import { render, screen } from '@testing-library/react';
import { Tempo } from '../../types/songs';
import TempoBadge from './TempoBadge';

test.each([
  [Tempo.FAST, 'Fast'],
  [Tempo.MEDIUM, 'Medium'],
  [Tempo.SLOW, 'Slow'],
])(
  'it displays a text representation of a tempo value',
  (tempo, expectedText) => {
    render(<TempoBadge tempo={tempo} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  }
);
