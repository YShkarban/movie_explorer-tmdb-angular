import { Component, OnInit, inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyListItem } from '../../interfaces/list-item';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { Categories } from '../../interfaces/categories';
import { MatInputModule } from '@angular/material/input';

const getObservable = (collection: AngularFirestoreCollection<MyListItem>) => {
  const subject = new BehaviorSubject<MyListItem[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: MyListItem[]) => {
    subject.next(val.sort((x, y) => Number(y.favorites) - Number(x.favorites)));
  });
  return subject;
};

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class MyListComponent implements OnInit {
  private db = inject(AngularFirestore);
  private snackbar = inject(MatSnackBar);

  want = getObservable(this.db.collection('want')) as Observable<MyListItem[]>;
  watched = getObservable(this.db.collection('watched')) as Observable<
    MyListItem[]
  >;

  
  categories: Categories[] = [
    { value: 1, name: 'Movie' },
    { value: 2, name: 'TV' },
  ];
  selectedCategorie = this.categories[0].value;
  
  showResult!: any;
  list: string = 'want';
  swapedState: boolean = true;
  
  public searchName = new FormControl('');

  ngOnInit(): void {}

  constructor() {}

  removeItem(event: any) {
    this.db.collection(this.list).doc(event.id).delete();
    this.snackbar.open('Movie removed from list', 'OK');
  }

  wantItem(event: any) {
    let inputTask: MyListItem = {
      title: event.title,
      overview: event.overview,
      poster_path: event.poster_path,
      favorites: event.favorites,
    };

    this.db.collection('want').add(inputTask);
    this.snackbar.open('Movie added to Want list', 'OK');
  }

  watchedItem(event: any) {
    let inputTask: MyListItem = {
      title: event.title,
      overview: event.overview,
      poster_path: event.poster_path,
      favorites: event.favorites,
    };
    this.db.collection('watched').add(inputTask);
    this.snackbar.open('Movie added to Watched list', 'OK');
  }

  addFavorites(event: any) {
    event.favorites = !event.favorites;
    this.db.collection(this.list).doc(event.id).update(event);
  }

  swapList() {
    this.swapedState = !this.swapedState;
    this.list = this.swapedState ? "want" : "watched";
  }
}
