import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    localStorage.setItem('isLoggedIn', 'true');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Header />);
    expect(screen.getByText('My Note App')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('logs out and redirects to /login on logout button click', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Logout'));
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(push).toHaveBeenCalledWith('/login');
  });
});
