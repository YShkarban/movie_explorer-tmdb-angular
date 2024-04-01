import { ITvSerie } from './tvseries';
import { IMovie } from './movie';

export interface IPerson{
    profile_path: string;
    adult: boolean;
    id: number;
    known_for: Array<ITvSerie | IMovie>; 
    name: string;
    popularity: number;
}

export const isMovieTypeGuard = (media: ITvSerie | IMovie): media is IMovie => {
    return (media as IMovie).title !== undefined;
}

export interface IPersonDetails{
    name: string;
    profile_path: string | null;
    biography: string;
    place_of_birth: string | null;
    birthday: string | null;
    deathday: string | null;
    known_for_department: string;
    gender: number;
    also_known_as: string[];
}