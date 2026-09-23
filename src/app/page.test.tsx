import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from './page';

describe('HomePage Smoke Test', () => {
  it('renders the core platform heading, navigation, and foundation identity', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { level: 1, name: /human capital development/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/genius hub/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /apply for training/i }).length).toBeGreaterThan(0);
  });
});
