import axios from "axios";
import type { NewNote, Note, SortBy, NoteTag } from "../types/note";
import { SortByValues } from "../types/note";


const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const PER_PAGE = 10;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


interface FetchNotesRequest {
  search?: string;
  page?: number;
  tag?: NoteTag;
}

interface FetchNotesParams extends FetchNotesRequest {
  perPage: number;
  sortBy: SortBy;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ search, tag, page }: FetchNotesRequest): Promise<FetchNotesResponse> => {
  try {
    const params: FetchNotesParams = { page, perPage: PER_PAGE, sortBy: SortByValues.CREATED };
    if (search) {
      params.search = search;
    }

    if (tag) {
      params.tag = tag;
    }

    const response = await axios.get("/notes", { params });

    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

export const getNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await axios.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    throw error;
  }
}

export const createNote = async (note: NewNote): Promise<Note> => {
  try {
    const response = await axios.post("/notes", note);
    return response.data;
  } catch (error) {
    console.error("Error posting note:", error);
    throw error;
  }
}

export const updateNote = async (id: string, note: Partial<NewNote>): Promise<Note> => {
  try {
    const response = await axios.put(`/notes/${id}`, note);
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axios.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}