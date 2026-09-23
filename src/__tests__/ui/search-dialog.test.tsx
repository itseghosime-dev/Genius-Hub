import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchDialog, SearchTrigger } from '../../components/navigation/SearchDialog';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Global Search Dialog Component', () => {
  it('renders SearchTrigger with keyboard shortcut indicator', () => {
    const handleOpen = vi.fn();
    render(<SearchTrigger onClick={handleOpen} />);

    const triggerBtn = screen.getByRole('button', { name: /open search dialog/i });
    expect(triggerBtn).toBeInTheDocument();

    fireEvent.click(triggerBtn);
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it('renders search input, filter pills, and popular pathways when opened', () => {
    const handleClose = vi.fn();
    render(<SearchDialog isOpen={true} onClose={handleClose} />);

    const dialog = screen.getByRole('dialog', { name: /global site search/i });
    expect(dialog).toBeInTheDocument();

    const input = screen.getByRole('searchbox', { name: /search keywords/i });
    expect(input).toBeInTheDocument();

    // Filters
    expect(screen.getByRole('button', { name: 'All Results' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Programmes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();

    // Popular pathways
    expect(screen.getByText('Training Programmes')).toBeInTheDocument();
  });

  it('displays search query state when user enters search terms', () => {
    const handleClose = vi.fn();
    render(<SearchDialog isOpen={true} onClose={handleClose} />);

    const input = screen.getByRole('searchbox', { name: /search keywords/i });
    fireEvent.change(input, { target: { value: 'Garment' } });

    expect(screen.getByText('Garment')).toBeInTheDocument();
    expect(screen.getByText(/searching for/i)).toBeInTheDocument();
  });

  it('closes when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<SearchDialog isOpen={true} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
