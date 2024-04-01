import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'details', component: DetailsComponent },
    { path: '', component: AppComponent },
    { path: '**', component: PageNotFoundComponent },
];

