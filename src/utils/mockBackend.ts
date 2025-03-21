import { Note } from "../../type";

export const getNotes = () => {
    const storeNotes = localStorage.getItem('notes');
    if (storeNotes) {
        const notes: Note[] = JSON.parse(storeNotes) || [];
        return notes;
    }
    return [];
};

export const getNote = (id: String) => {
    const storeNotes = localStorage.getItem('notes');
    if (storeNotes) {
        const notes: Note[] = JSON.parse(storeNotes) || [];
        const note = notes.find(item => item.id === id);
        if (!note) return null;
        return note;
    }
    return null;
};

export const addNote = (note: Note) => {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
};

export const updateNote = (id: string, updatedNote: Note) => {
    const notes = getNotes();
    const index = notes.findIndex((note: Note) => note.id === id);
    if (index !== -1) {
        notes[index] = updatedNote;
        localStorage.setItem('notes', JSON.stringify(notes));
    }
};

export const deleteNote = (id: string) => {
    const notes = getNotes();
    const updatedNotes = notes.filter((note: Note) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
};
