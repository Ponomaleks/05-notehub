export interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface Note extends NewNote {
  id: string;
  createdAt: string; // Example: "2022-01-01T00:00:00Z"
  updatedAt: string;
}

export const TagValues = {
  WORK: "Work",
  PERSONAL: "Personal",
  MEETING: "Meeting",
  SHOPPING: "Shopping",
  TODO: "Todo",
} as const;

export type NoteTag = typeof TagValues[keyof typeof TagValues];