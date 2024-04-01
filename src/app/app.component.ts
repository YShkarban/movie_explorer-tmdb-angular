import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { debounceTime, distinctUntilChanged, lastValueFrom, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { IDiscoverPageContent } from '../interfaces/responce';
import { IMovie, MovieSearch } from '../interfaces/movie';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Categories } from '../interfaces/categories';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ITvSeries } from '../interfaces/tvseries';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  categories: Categories[] = [
    { value: 1, name: 'Movie' },
    { value: 2, name: 'TV' },
  ];
  selectedCategorie = this.categories[0].value;

  title = 'TMDB-MovieList-Angular';
  private tmdbService = inject(TmdbService);
  hotMovies!: IDiscoverPageContent<IMovie>;
  hotTvs!: IDiscoverPageContent<ITvSeries>;
  showResult!: IDiscoverPageContent<any>;
  public searchName = new FormControl('');
  type: number = 1;
  findMovies: boolean = false;

  async ngOnInit() {
    this.hotMovies = await lastValueFrom(this.tmdbService.discoverMovie(null));
    this.hotTvs = await lastValueFrom(this.tmdbService.discoverTv(null));
    this.searchName.valueChanges
      .pipe(
        tap(() => {}),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe((filter) => {
        if (filter) {
          if (this.selectedCategorie == 1) {
            this.tmdbService
              .searchMovie({ query: filter ?? '' })
              .subscribe((result) => {
                this.showResult = result;
              });
          } else if (this.selectedCategorie == 2) {
            this.tmdbService
              .searchTv({ query: filter ?? '' })
              .subscribe((result) => {
                this.showResult = result;
              });
          }

          this.findMovies = true;
        } else {
          this.tmdbService.discoverMovie(null).subscribe((result) => {
            this.hotMovies = result;
          });
          this.tmdbService.discoverTv(null).subscribe((result) => {
            this.hotTvs = result;
          });

          this.findMovies = false;
        }
      });
  }

  typeChoose(choice: number) {
    this.type = choice;
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  }
}
