import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/layout/Footer';

describe('Footer Component', () => {
  it('renders brand information, mission statement, and office locations', () => {
    render(<Footer />);

    // Brand mark
    expect(screen.getAllByText(/Genius/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/global development organization/i)).toBeInTheDocument();

    // Office addresses
    expect(screen.getByText(/Benin City/i)).toBeInTheDocument();
    expect(screen.getByText(/Lagos/i)).toBeInTheDocument();
  });

  it('renders structured column links for public IA', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { name: 'Organization' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What We Do' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Impact & Media' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Opportunities' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Trust & Legal' })).toBeInTheDocument();

    // Link check
    const leadershipLink = screen.getByRole('link', { name: 'Leadership & Team' });
    expect(leadershipLink).toBeInTheDocument();
    expect(leadershipLink).toHaveAttribute('href', '/about/leadership');
  });

  it('renders newsletter signup placeholder and copyright notice', () => {
    render(<Footer />);

    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    expect(screen.getByText(/Genius Hub Global/i)).toBeInTheDocument();
  });
});
