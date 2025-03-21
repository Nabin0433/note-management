import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateNoteModal from './CreateNoteModal';

describe('CreateNoteModal', () => {
  const mockOnClose = jest.fn();
  const mockOnAddNote = jest.fn();

  beforeEach(() => {
    render(<CreateNoteModal onClose={mockOnClose} onAddNote={mockOnAddNote} />);
  });

  it('renders modal form elements', () => {
    expect(screen.getByText('Create New Note')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Note Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Note Content')).toBeInTheDocument();
    expect(screen.getByText('Add Note')).toBeInTheDocument();
  });

  it('calls onAddNote and onClose on valid form submit', async () => {
    fireEvent.change(screen.getByPlaceholderText('Note Title'), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Note Content'), {
      target: { value: 'Test Content' },
    });
  
    fireEvent.click(screen.getByText('Add Note'));
  
    await waitFor(() => {
      expect(mockOnAddNote).toHaveBeenCalledWith('Test Title', 'Test Content');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
  

  it('shows validation errors on empty submit', async () => {
    fireEvent.click(screen.getByText('Add Note'));

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(await screen.findByText('Content is required')).toBeInTheDocument();
  });
});
