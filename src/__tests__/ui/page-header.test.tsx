import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageHeader } from '../../components/layout/PageHeader';

describe('PageHeader Primitive Component', () => {
  it('renders page title and description', () => {
    render(
      <PageHeader
        title="Our Programmes"
        description="Comprehensive vocational and enterprise training tracks."
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Our Programmes' })).toBeInTheDocument();
    expect(
      screen.getByText('Comprehensive vocational and enterprise training tracks.'),
    ).toBeInTheDocument();
  });

  it('renders badge and breadcrumb navigation when provided', () => {
    render(
      <PageHeader
        badge={{ text: 'Capacity Building', variant: 'brand' }}
        title="Training Tracks"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'What We Do', href: '/focus-areas' },
          { label: 'Training Tracks' },
        ]}
      />,
    );

    expect(screen.getByText('Capacity Building')).toBeInTheDocument();

    const breadcrumbsNav = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(breadcrumbsNav).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');

    const currentItem = screen.getByText('Training Tracks', { selector: 'span' });
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders actions slot when provided', () => {
    render(
      <PageHeader title="Custom Header" actions={<button type="button">Custom CTA</button>} />,
    );

    expect(screen.getByRole('button', { name: 'Custom CTA' })).toBeInTheDocument();
  });
});
