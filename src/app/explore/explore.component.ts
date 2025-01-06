import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Categories } from '../../interfaces/categories';
import { TmdbService } from '../../services/tmdb.service';
import { IMovie } from '../../interfaces/movie';
import { IDiscoverPageContent } from '../../interfaces/responce';
import { ITvSeries } from '../../interfaces/tvseries';
import { debounceTime, distinctUntilChanged, lastValueFrom, tap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MyListItem } from '../../interfaces/list-item';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-explore',
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
    MatToolbarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MovieRatingComponent,
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent implements OnInit {
  private snackbar = inject(MatSnackBar);
  private db = inject(AngularFirestore);
  readonly dialog = inject(MatDialog);

  categories: Categories[] = [
    { value: 1, name: 'Movie' },
    { value: 2, name: 'TV' },
  ];
  selectedCategorie = this.categories[0].value;

  private tmdbService = inject(TmdbService);
  hotMovies!: IDiscoverPageContent<IMovie>;
  hotTvs!: IDiscoverPageContent<ITvSeries>;
  showResult!: IDiscoverPageContent<any>;
  public searchName = new FormControl('');
  type: number = 1;
  findMovies: boolean = false;

  pending: boolean = false;

  constructor() {}

  async ngOnInit() {
    this.pending = true;
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

        this.pending = false;
      });

    this.pending = false;
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

  wantItem(event: any) {
    let inputTask: MyListItem = {
      title: event.title,
      overview: event.overview,
      poster_path: event.poster_path,
      favorites: false,
      movie_id: event.id,
    };

    this.db.collection('want').add(inputTask);
    this.snackbar.open('Movie added to Want list', 'OK');
  }

  watchedItem(event: any) {
    let inputTask: MyListItem = {
      title: event.title,
      overview: event.overview,
      poster_path: event.poster_path,
      favorites: false,
      movie_id: event.id,
    };

    const dialogRef = this.dialog.open(MovieRatingComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        inputTask.rating = result;

        this.db.collection('watched').add(inputTask);
        this.snackbar.open('Movie added to Watched list', 'OK');
      }
    });
  }
}
