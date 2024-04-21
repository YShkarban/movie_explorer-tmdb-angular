import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExploreComponent } from './explore/explore.component';
import { MyListComponent } from './my-list/my-list.component';

export const routes: Routes = [
  { path: 'explore', component: ExploreComponent },
  { path: 'details/:type/:id', component: DetailsComponent },
  { path: 'mylist', component: MyListComponent },
  { path: '', component: ExploreComponent },
  { path: '**', component: PageNotFoundComponent },
];
