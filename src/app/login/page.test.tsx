import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@/app/login/page';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Login Page', () => {
    const push = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push });
        localStorage.clear();
        push.mockClear();
    });

    it('renders login form', async () => {
        render(<Login />);
        await waitFor(() => {
            expect(screen.getByText('Username')).toBeInTheDocument();
        });
    });

    it('shows error on invalid login', async () => {
        render(<Login />);

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'wrong' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'user' },
        });
        fireEvent.click(screen.getByTestId('button'));

        await waitFor(() => {
            expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
        });
    });

    it('logs in with correct credentials and redirects', async () => {
        render(<Login />);
        await waitFor(() => {
            expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        });
        fireEvent.change(screen.getByPlaceholderText('Username'), {
            target: { value: 'admin' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'admin' },
        });
        fireEvent.click(screen.getByTestId('button'));

        await waitFor(() => {
            expect(localStorage.getItem('isLoggedIn')).toBe('true');
            expect(push).toHaveBeenCalledWith('/');
        });
    });
});
