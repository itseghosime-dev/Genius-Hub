import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrandLoader } from '../../components/ui';

describe('UI Primitives — BrandLoader & Motion Accessibility', () => {
  it('renders with role="status" and default accessible label', () => {
    render(<BrandLoader />);
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-label', 'Loading Genius Hub...');
  });

  it('renders custom label visually when showLabel is true', () => {
    render(<BrandLoader label="Please wait..." showLabel />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('renders different size variants properly', () => {
    const { rerender } = render(<BrandLoader size="sm" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<BrandLoader size="lg" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
