import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import { describe, expect, it } from 'vitest';

describe('LoadingSpinner Component', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />);
  });

  it('renders the spinner icon with correct class', () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerIcon = container.querySelector('svg');
    
    expect(spinnerIcon).toBeInTheDocument();
    expect(spinnerIcon).toHaveClass('animate-spin text-blue-500 text-4xl');
  });
});
