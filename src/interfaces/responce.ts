export interface IDiscoverPageContent<T> {
    page: number;
    total_results: number;
    total_pages: number;
    results: T[];
}

export interface IPersonCredit {
    id: number;
    department: string;
    original_language: string;
    original_title: string;
    job: string;
    overview: string;
    vote_count: 3;
    video: boolean;
    media_type: string;
    poster_path: string | null;
    backdrop_path: string | null;
    title: string;
    popularity: number;
    genre_ids: number[];
    vote_average: number;
    adult: false;
    release_date: string;
    credit_id: string;
}

export interface IPersonCombinedCreditsResponse {
    id: number;
    crew: Array<IPersonCredit>;
    cast: Array<IPersonCredit>;
}