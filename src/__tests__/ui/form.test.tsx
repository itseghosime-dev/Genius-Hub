import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField, Input, Textarea, Select, Checkbox, Radio } from '../../components/ui';

describe('UI Primitives — Form Foundation & Accessibility', () => {
  it('renders FormField with accessible label and required indicator', () => {
    render(
      <FormField label="Full Name" htmlFor="name-input" required>
        <Input id="name-input" />
      </FormField>,
    );

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('associates description and error with input correctly', () => {
    render(
      <FormField
        label="Email Address"
        htmlFor="email-input"
        description="We will never share your email."
        error="Invalid email format"
      >
        <Input id="email-input" hasError />
      </FormField>,
    );

    const input = screen.getByLabelText(/email address/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText(/invalid email format/i)).toHaveAttribute('role', 'alert');
    expect(screen.getByText(/we will never share your email/i)).toBeInTheDocument();
  });

  it('renders Textarea and Select with error states', () => {
    render(
      <div>
        <FormField label="Bio" htmlFor="bio">
          <Textarea id="bio" placeholder="Tell us about yourself" />
        </FormField>
        <FormField label="Country" htmlFor="country">
          <Select
            id="country"
            placeholder="Select a country"
            options={[
              { value: 'ng', label: 'Nigeria' },
              { value: 'gh', label: 'Ghana' },
            ]}
          />
        </FormField>
      </div>,
    );

    expect(screen.getByPlaceholderText(/tell us about yourself/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /nigeria/i })).toBeInTheDocument();
  });

  it('toggles Checkbox and Radio correctly', () => {
    render(
      <div>
        <Checkbox id="terms" label="Accept Terms" />
        <Radio id="opt-1" name="plan" label="Option 1" />
        <Radio id="opt-2" name="plan" label="Option 2" />
      </div>,
    );

    const checkbox = screen.getByLabelText(/accept terms/i);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const radio1 = screen.getByLabelText(/option 1/i);
    const radio2 = screen.getByLabelText(/option 2/i);
    expect(radio1).not.toBeChecked();
    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    fireEvent.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });
});
