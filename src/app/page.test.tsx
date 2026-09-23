import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('HomePage Smoke Test', () => {
  it('renders the core platform heading and foundation identity', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: /genius hub/i })).toBeInTheDocument();
    expect(screen.getByText(/digital platform/i)).toBeInTheDocument();
    expect(screen.getByText(/engineering foundation/i)).toBeInTheDocument();
  });
});
