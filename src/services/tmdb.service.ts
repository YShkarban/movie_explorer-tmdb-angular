import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMovie, MovieSearch } from '../interfaces/movie';
import { Observable } from 'rxjs';
import { IDiscoverPageContent } from '../interfaces/responce';
import { ITvSeries } from '../interfaces/tvseries';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private _base_url = environment.tmdb.baseUrl;
  private _api_key = environment.tmdb.apiKey;

  constructor(private httpClient: HttpClient) {}

  private urlBuilder(endpoint: string, params?: any): string {
    const queryParams = params
      ? Object.keys(params)
          .map((key) => key + '=' + params[key])
          .join('&')
      : '';
    return `${this._base_url}${endpoint}?api_key=${this._api_key}&${queryParams}`;
  }

  discoverMovie(params: any): Observable<IDiscoverPageContent<IMovie>> {
    return this.httpClient.get<IDiscoverPageContent<IMovie>>(
      this.urlBuilder('/discover/movie', params)
    );
  }

  discoverTv(params: any): Observable<IDiscoverPageContent<ITvSeries>> {
    return this.httpClient.get<IDiscoverPageContent<ITvSeries>>(
      this.urlBuilder('/discover/tv', params)
    );
  }

  searchMovie(params: MovieSearch): Observable<IDiscoverPageContent<IMovie>> {
    return this.httpClient.get<IDiscoverPageContent<IMovie>>(
      this.urlBuilder('/search/movie', params)
    );
  }

  searchTv(params: MovieSearch): Observable<IDiscoverPageContent<ITvSeries>> {
    return this.httpClient.get<IDiscoverPageContent<ITvSeries>>(
      this.urlBuilder('/search/tv', params)
    );
  }
}
