import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
  useIsMutating,
} from '@tanstack/react-query';
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
import {
  fetchNotes,
  deleteNote,
  createNote,
  type FetchNotesResponse,
} from '../../services/noteService';
import type { NewNote } from '../../types/note';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isFetching, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', searchQuery, currentPage],
    queryFn: () => fetchNotes({ search: searchQuery, page: currentPage }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30, // 15 seconds
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: any) => {
      toast.error(
        error?.message || 'An error occurred while deleting the note.',
      );
      console.error('Error deleting note:', error);
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.message || 'An error occurred while creating the note.',
      );
      console.error('Error creating note:', error);
    },
  });

  const isMutating = useIsMutating() > 0;
  const isBusy = isFetching || isMutating;

  const debouncedSetQuery = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
  }, 500);

  const openModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  if (isError) {
    toast.error(error?.message || 'An error occurred while fetching notes.');
    console.error('!Error fetching notes:', error);
  }

  const handleDeleteNote = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  const handleCreateNote = (values: NewNote) => {
    createNoteMutation.mutate(values);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox setQuery={debouncedSetQuery} />
          {totalPages > 1 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              setPage={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
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
