import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "../services/noteService";

export const useFetchNotes = (search: string, page: number) => {
  return useQuery<FetchNotesResponse>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30, // 15 seconds
  });
}