import axios from "axios";
import type { NewNote, Note, NoteTag } from "../types/note";


const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const PER_PAGE = 10;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesRequest {
  search?: string;
  page?: number;
  tag?: NoteTag;
}

interface FetchNotesParams extends FetchNotesRequest {
  perPage: number;
  sortBy: SortBy;
}

const SortByValues = {
  CREATED: "created",
  UPDATED: "updated",
} as const;

type SortBy = typeof SortByValues[keyof typeof SortByValues];

export const fetchNotes = async ({ search, tag, page }: FetchNotesRequest): Promise<FetchNotesResponse> => {
  try {
    const params: FetchNotesParams = { page, perPage: PER_PAGE, sortBy: SortByValues.CREATED };
    if (search) {
      params.search = search;
    }

    if (tag) {
      params.tag = tag;
    }

    const response = await axios.get<FetchNotesResponse>("/notes", { params });

    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

export const createNote = async (note: NewNote): Promise<Note> => {
  try {
    const response = await axios.post<Note>("/notes", note);
    return response.data;
  } catch (error) {
    console.error("Error posting note:", error);
    throw error;
  }
}

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}