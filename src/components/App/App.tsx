import { useState } from 'react';
import { useIsMutating } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';

import css from './App.module.css';
import {
  SearchBox,
  Pagination,
  NoteList,
  Modal,
  NoteForm,
  Loader,
} from '../index';
import { deleteNote, createNote } from '../../services/noteService';
import { useFetchNotes } from '../../hooks/useFetchNotes';
import { useNotesMutations } from '../../hooks/useNotesMutations';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching, isError, error } = useFetchNotes(
    searchQuery,
    currentPage,
  );
  const { handleDeleteNote, handleCreateNote } = useNotesMutations({
    deleteNoteFn: deleteNote,
    createNoteFn: createNote,
    setIsModalOpen,
  });

  if (isError) {
    toast.error(error?.message || 'An error occurred while fetching notes.');
    console.error('!Error fetching notes:', error);
  }

  const handleSetQuery = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 500);

  const handleOpenModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const isMutating = useIsMutating() > 0;
  const isBusy = isFetching || isMutating;
  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox setQuery={handleSetQuery} />
          {totalPages > 1 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              setPage={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={handleOpenModal}>
            Create note +
          </button>
        </header>
        <main className={css.main}>
          {!!notes.length && (
            <NoteList notes={notes} onDelete={handleDeleteNote} />
          )}
        </main>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateNote}
          />
        </Modal>
      )}
      {isBusy && <Loader />}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}

export default App;
