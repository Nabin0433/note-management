import {
    getNotes,
    getNote,
    addNote,
    updateNote,
    deleteNote,
  } from '@/utils/mockBackend';
  import { Note } from '../../type';
  
  describe('mockBackend', () => {
    const mockNote: Note = {
      id: '1',
      title: 'Test Note',
      content: 'This is a test note',
      createdTime: new Date().toISOString(),
    };
  
    beforeEach(() => {
      localStorage.clear();
    });
  
    test('addNote stores a note', () => {
      addNote(mockNote);
      const notes = getNotes();
      expect(notes).toHaveLength(1);
      expect(notes[0].title).toBe('Test Note');
    });
  
    test('getNote returns correct note by ID', () => {
      addNote(mockNote);
      const note = getNote('1');
      expect(note).not.toBeNull();
      expect(note?.id).toBe('1');
    });
  
    test('getNote returns null if not found', () => {
      const note = getNote('999');
      expect(note).toBeNull();
    });
  
    test('updateNote modifies the note', () => {
      addNote(mockNote);
      const updated = { ...mockNote, title: 'Updated Title' };
      updateNote('1', updated);
      const notes = getNotes();
      expect(notes[0].title).toBe('Updated Title');
    });
  
    test('deleteNote removes the note', () => {
      addNote(mockNote);
      deleteNote('1');
      const notes = getNotes();
      expect(notes).toHaveLength(0);
    });
  });
  