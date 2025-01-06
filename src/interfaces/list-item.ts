import { Genre } from './movie';

export interface MyListItem {
  id?: string;
  overview: string;
  title: string;
  poster_path: string;
  favorites: boolean;
  movie_id: number;
  rating?: number;
}
