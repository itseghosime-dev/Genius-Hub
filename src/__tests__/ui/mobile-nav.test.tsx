import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileNav } from '../../components/navigation/MobileNav';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Mobile Navigation Drawer Component', () => {
  it('renders mobile menu toggle button initially', () => {
    const handleOpenSearch = vi.fn();
    render(<MobileNav onOpenSearch={handleOpenSearch} />);

    const menuToggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuToggle).toBeInTheDocument();
  });

  it('opens drawer, renders navigation sections, and closes on close button click', () => {
    const handleOpenSearch = vi.fn();
    render(<MobileNav onOpenSearch={handleOpenSearch} />);

    const menuToggle = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(menuToggle);

    const dialog = screen.getByRole('dialog', { name: /mobile navigation/i });
    expect(dialog).toBeInTheDocument();

    // Close button inside drawer
    const closeBtns = screen.getAllByRole('button', { name: /close navigation menu/i });
    expect(closeBtns.length).toBeGreaterThan(0);

    fireEvent.click(closeBtns[0]!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('expands accordion sections when clicked', () => {
    const handleOpenSearch = vi.fn();
    render(<MobileNav onOpenSearch={handleOpenSearch} />);

    // Open drawer
    fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }));

    const whatWeDoAccordion = screen.getByRole('button', { name: /what we do/i });
    expect(whatWeDoAccordion).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(whatWeDoAccordion);
    expect(whatWeDoAccordion).toHaveAttribute('aria-expanded', 'true');

    // Children links should be in the document
    expect(screen.getByRole('link', { name: /focus areas/i })).toBeInTheDocument();
  });

  it('closes drawer when Escape key is pressed', () => {
    const handleOpenSearch = vi.fn();
    render(<MobileNav onOpenSearch={handleOpenSearch} />);

    // Open drawer
    fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
