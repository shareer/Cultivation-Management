import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import UserRole from './UserRole';
import { getUserRoles } from '../../services/UserService';


vi.mock('../../store/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../services/UserService', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getUserRoles: vi.fn(),
  };
});

const mockUserRoles = [
  { id: 1, name: 'Admin', description: 'Administrator role' },
  { id: 2, name: 'User', description: 'User role' },
];

describe('UserRole', () => {
  const onToggle = vi.fn();
  const onChangeUserRole = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (getUserRoles as vi.Mock).mockResolvedValue(mockUserRoles);
  });

  it('should render the toggle button', () => {
    render(<UserRole isVisible={false} onToggle={onToggle} onChangeUserRole={onChangeUserRole} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });


  it('should display loading state while fetching user roles', () => {
    render(<UserRole isVisible={true} onToggle={onToggle} onChangeUserRole={onChangeUserRole} />);

    fireEvent.click(screen.getByRole('button'));
  });
});
