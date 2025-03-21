import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NoteDetails from '@/app/note/[id]/page';
import * as mockBackend from '@/utils/mockBackend';

jest.mock('@/utils/mockBackend');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    use: (promise: any) => ({ id: '123' }),
  };
});

describe('NoteDetails', () => {
  const mockNote = {
    id: '123',
    title: 'Test Note',
    content: 'Test Content',
    createdTime: new Date().toISOString(),
  };

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 'true');
    (mockBackend.getNote as jest.Mock).mockReturnValue(mockNote);
  });

  it('renders note and allows editing', async () => {
    const updateNoteMock = jest.spyOn(mockBackend, 'updateNote');
    render(<NoteDetails params={Promise.resolve({ id: '123' })} />);

    expect(await screen.findByDisplayValue('Test Note')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Test Content')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Note Title'), {
      target: { value: 'Updated Title' },
    });

    fireEvent.change(screen.getByPlaceholderText('Note Content'), {
      target: { value: 'Updated Content' },
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(updateNoteMock).toHaveBeenCalledWith('123', expect.objectContaining({
        title: 'Updated Title',
        content: 'Updated Content',
      }));
    });
  });

  it('deletes note', async () => {
    const deleteNoteMock = jest.spyOn(mockBackend, 'deleteNote');
    render(<NoteDetails params={Promise.resolve({ id: '123' })} />);

    fireEvent.click(await screen.findByText('Delete'));

    await waitFor(() => {
      expect(deleteNoteMock).toHaveBeenCalledWith('123');
    });
  });
});
