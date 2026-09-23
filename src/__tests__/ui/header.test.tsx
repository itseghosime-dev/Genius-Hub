import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../../components/navigation/Header';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header Component & Navigation Interactivity', () => {
  it('renders brand logo, desktop navigation, search trigger, and primary CTA', () => {
    render(<Header />);

    // Brand logo
    const logoLink = screen.getByRole('link', { name: /genius hub/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    // Primary CTA
    const applyButton = screen.getByRole('link', { name: /apply for training/i });
    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toHaveAttribute('href', '/apply');

    // Search trigger button
    const searchBtn = screen.getByRole('button', { name: /open search dialog/i });
    expect(searchBtn).toBeInTheDocument();

    // Mobile menu toggle button
    const mobileToggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(mobileToggle).toBeInTheDocument();
  });

  it('renders skip link targeting main content', () => {
    render(<Header />);
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('opens mobile navigation drawer when mobile menu button is clicked', () => {
    render(<Header />);
    const mobileToggle = screen.getByRole('button', { name: /open navigation menu/i });

    fireEvent.click(mobileToggle);

    // Mobile navigation dialog should now be visible
    const mobileNavDialog = screen.getByRole('dialog', { name: /mobile navigation/i });
    expect(mobileNavDialog).toBeInTheDocument();
  });

  it('opens search dialog when search trigger is clicked', () => {
    render(<Header />);
    const searchBtn = screen.getByRole('button', { name: /open search dialog/i });

    fireEvent.click(searchBtn);

    const searchDialog = screen.getByRole('dialog', { name: /global site search/i });
    expect(searchDialog).toBeInTheDocument();
  });
});
