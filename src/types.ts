// types.ts
export interface ScreenParams {
  maqsadId?: number;
  bookId?: number;
  faslId?: number;
  categoryId?: number;
  first_hadith_number?: number;
}

export interface ScreenI {
  name: string;
  params: ScreenParams;
}

export type ScreenName =
  | "maqsads"
  | "books"
  | "fasls"
  | "categories"
  | "hadiths"
  | "search"
  | "settings";
