'use client'
import { useEffect, useState } from 'react';
import { addNote, getNotes } from '../utils/mockBackend';
import { Note } from '../../type';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Button from '@/components/Button';
import CreateNoteModal from '@/components/CreateNoteModal';
import { formatDate } from '@/utils/helper';
import Loading from '@/components/Loading';

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNotePopup, setNewNotePopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setNotes(getNotes());
    }

    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const handleNewNoteClick = () => {
    setNewNotePopup(true)
  }

  const submitNote = (title: string, content: string) => {
    const newNote = {
      id: `${Date.now()}`,
      title,
      content,
      createdTime: `${Date.now()}`,
    }
    addNote(newNote);
    setNotes(old => [...old, newNote]);
  }

  if (loading) return <Loading />

  return (
    <>
      <Header />
      <main className='container px-4 md:px-0 mx-auto'>
        <div className='flex justify-end w-full my-8'>
          <Button title='Create new note' onClick={handleNewNoteClick} type={'button'} />
        </div>
        {notes[0] && (
          <>
            <h3 className='font-semibold text-xl text-white my-12'>My Save Notes ({notes.length})</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-8'>
              {notes.map((note) => (
                <div className='rounded-xl shadow bg-white text-black p-8 cursor-pointer' key={note.id} onClick={() => router.push(`/note/${note.id}`)}>
                  <p className='text-sm text-right text-gray-400'>{formatDate(note.createdTime)}</p>
                  <h2 className='font-semibold text-lg mt-6'>{note.title}</h2>
                  <p className='mt-2'>{note.content}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {!notes[0] && (
          <div className='w-full flex items-center justify-center h-[80vh]'>
            <p>Not Notes Found</p>
          </div>
        )}

        {newNotePopup && <CreateNoteModal onClose={() => setNewNotePopup(false)} onAddNote={(title: string, content: string) => submitNote(title, content)} />}

      </main>
    </>
  );
};

export default Home;
