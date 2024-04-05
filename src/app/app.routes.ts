import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExploreComponent } from './explore/explore.component';

export const routes: Routes = [
  { path: 'explore', component: ExploreComponent },
  { path: 'details/:type/:id', component: DetailsComponent },
  { path: '', component: ExploreComponent },
  { path: '**', component: PageNotFoundComponent },
];
