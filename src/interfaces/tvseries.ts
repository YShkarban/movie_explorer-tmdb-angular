export interface ITvSeries{
    poster_path: string | null;
    adult: boolean;
    overview: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    vote_average: number;
    first_air_date: string;
    origin_country: string[];
    original_language: string;
    name: string;
    original_name: string;
}