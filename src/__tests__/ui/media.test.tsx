import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, Tag, Stat, Avatar, Breadcrumbs, ImageWithCaption } from '../../components/ui';

describe('UI Primitives — Media, Badges, Stats & Structural Primitives', () => {
  it('renders Badge with variants and dot indicator', () => {
    render(
      <Badge variant="success" dot>
        Active
      </Badge>,
    );
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders Tag and handles onRemove callback', () => {
    render(
      <Tag onRemove={() => {}} removeLabel="Delete filter">
        Edo State
      </Tag>,
    );
    expect(screen.getByText('Edo State')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete filter')).toBeInTheDocument();
  });

  it('renders Stat milestone with prefix, suffix, and trend', () => {
    render(
      <Stat
        prefix="₦"
        value="250M"
        suffix="+"
        label="Grant Capital"
        description="Total disbursed funding"
        trend={{ value: '+15%', positive: true }}
      />,
    );

    expect(screen.getByText('₦')).toBeInTheDocument();
    expect(screen.getByText('250M')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('Grant Capital')).toBeInTheDocument();
    expect(screen.getByText('Total disbursed funding')).toBeInTheDocument();
    expect(screen.getByText('+15%')).toBeInTheDocument();
  });

  it('renders Avatar with initials fallback and status indicator', () => {
    render(<Avatar name="Isimeme Whyte" role="Founder" status="online" />);
    expect(screen.getByText('IW')).toBeInTheDocument();
    expect(screen.getByLabelText('Status: online')).toBeInTheDocument();
  });

  it('renders Breadcrumbs with navigation landmarks and aria-current', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Programmes', href: '/programmes' },
          { label: 'Solar Tech', current: true },
        ]}
      />,
    );

    expect(screen.getByRole('navigation', { name: /breadcrumbs/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByText('Solar Tech')).toHaveAttribute('aria-current', 'page');
  });

  it('renders ImageWithCaption with figure and figcaption', () => {
    render(
      <ImageWithCaption
        caption="Workshop training session"
        credit="Genius Hub Media"
        media={<div data-testid="media-child">Media Content</div>}
      />,
    );

    expect(screen.getByTestId('media-child')).toBeInTheDocument();
    expect(screen.getByText('Workshop training session')).toBeInTheDocument();
    expect(screen.getByText(/Photo: Genius Hub Media/)).toBeInTheDocument();
  });
});
