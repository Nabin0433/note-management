import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getNotes, addNote } from '../utils/mockBackend';
import { Note } from '../../type';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import Home from './page';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../utils/mockBackend', () => ({
    getNotes: jest.fn(),
    addNote: jest.fn(),
}));

describe('Home', () => {
    const mockRouterPush = jest.fn();
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    });

    it('redirects to login page if not logged in', () => {
        localStorage.removeItem('isLoggedIn');
        render(<Home />);

        expect(mockRouterPush).toHaveBeenCalledWith('/login');
    });

    it('loads and displays notes if logged in', async () => {
        const mockNotes: Note[] = [
            { id: '1', title: 'Test Note', content: 'Test Content', createdTime: '1627689300000' },
        ];
        (getNotes as jest.Mock).mockReturnValue(mockNotes);
        localStorage.setItem('isLoggedIn', 'true');

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText('My Save Notes (1)')).toBeInTheDocument();
            expect(screen.getByText('Test Note')).toBeInTheDocument();
            expect(screen.getByText('Test Content')).toBeInTheDocument();
        });
    });

    it('shows loading indicator while loading', () => {
        localStorage.setItem('isLoggedIn', 'true');
        render(<Home />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('opens new note modal when button is clicked', async () => {
        localStorage.setItem('isLoggedIn', 'true');
        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText('Create new note')).toBeInTheDocument();
        })
        fireEvent.click(screen.getByText('Create new note'));

        expect(screen.getByText('Create New Note')).toBeInTheDocument();
    });

    it('adds a new note and updates the note list', async () => {
        const mockNotes: Note[] = [
            { id: '1', title: 'Test Note', content: 'Test Content', createdTime: '1627689300000' },
        ];
        (getNotes as jest.Mock).mockReturnValue(mockNotes);
        localStorage.setItem('isLoggedIn', 'true');

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Create new note')).toBeInTheDocument();
        })

        fireEvent.click(screen.getByText('Create new note'));

        const titleInput = screen.getByPlaceholderText('Note Title');
        const contentInput = screen.getByPlaceholderText('Note Content');

        fireEvent.change(titleInput, { target: { value: 'New Note' } });
        fireEvent.change(contentInput, { target: { value: 'This is a new note' } });

        fireEvent.click(screen.getByText('Add Note'));
    });


    it('shows "No Notes Found" when there are no notes', async () => {
        (getNotes as jest.Mock).mockReturnValue([]);
        localStorage.setItem('isLoggedIn', 'true');
        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Not Notes Found')).toBeInTheDocument();
        });
    });
});
