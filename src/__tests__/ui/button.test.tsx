import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, IconButton, LinkButton } from '../../components/ui';

describe('UI Primitives — Button & Interactive Elements', () => {
  it('renders button with children and default primary variant', () => {
    render(<Button>Apply Now</Button>);
    const btn = screen.getByRole('button', { name: /apply now/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('handles click events when active', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button and prevents click when disabled or isLoading', () => {
    const handleClick = vi.fn();
    const { rerender } = render(
      <Button disabled onClick={handleClick}>
        Disabled Action
      </Button>,
    );

    const btn = screen.getByRole('button', { name: /disabled action/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();

    rerender(
      <Button isLoading onClick={handleClick}>
        Loading Action
      </Button>,
    );
    const loadingBtn = screen.getByRole('button', { name: /loading action/i });
    expect(loadingBtn).toBeDisabled();
    expect(loadingBtn).toHaveAttribute('aria-busy', 'true');
  });

  it('renders IconButton with required aria-label', () => {
    render(
      <IconButton
        icon={<span data-testid="test-icon">icon</span>}
        aria-label="Download Document"
      />,
    );
    const btn = screen.getByRole('button', { name: /download document/i });
    expect(btn).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders LinkButton with internal and external link modes', () => {
    const { rerender } = render(<LinkButton href="/programmes">Explore Programmes</LinkButton>);
    const link = screen.getByRole('link', { name: /explore programmes/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/programmes');

    rerender(
      <LinkButton href="https://example.com" external>
        Partner Link
      </LinkButton>,
    );
    const extLink = screen.getByRole('link', { name: /partner link/i });
    expect(extLink).toHaveAttribute('target', '_blank');
    expect(extLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
