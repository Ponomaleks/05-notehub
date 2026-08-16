import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import type { NewNote, Note } from "../types/note";
import type { AxiosError } from "axios";

interface useNotesMutationsProps {
  deleteNoteFn: (id: string) => Promise<Note>;
  createNoteFn: (note: NewNote) => Promise<Note>;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const useNotesMutations = ({ deleteNoteFn, createNoteFn, setIsModalOpen }: useNotesMutationsProps) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNoteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: Error | AxiosError) => {
      toast.error(
        error?.message || 'An error occurred while deleting the note.',
      );
      console.error('Error deleting note:', error);
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: createNoteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
    onError: (error: Error | AxiosError) => {
      toast.error(
        error?.message || 'An error occurred while creating the note.',
      );
      console.error('Error creating note:', error);
    },
  });

  const handleDeleteNote = (noteId: string) => {
    deleteNoteMutation.mutate(noteId);
  };

  const handleCreateNote = (values: NewNote) => {
    createNoteMutation.mutate(values);
  };

  return {
    handleDeleteNote,
    handleCreateNote,
  };
}