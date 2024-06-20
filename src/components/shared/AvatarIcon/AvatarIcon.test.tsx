
import React from 'react';
import { render, screen } from '@testing-library/react';
import AvatarIcon from './AvatarIcon';
import { describe, expect, it } from 'vitest';

describe('AvatarIcon', () => {
  it('should render the initial of the name', () => {
    render(<AvatarIcon name="John Doe" color="blue" />);
    const initial = screen.getByText('J');
    expect(initial).toBeInTheDocument();
  });

  it('should render the initial in the correct color', () => {
    render(<AvatarIcon name="John Doe" color="blue" />);
    const initial = screen.getByText('J');
    expect(initial).toHaveClass('text-gray-800');
  });
});
