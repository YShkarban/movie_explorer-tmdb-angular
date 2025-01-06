import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExploreComponent } from './explore/explore.component';
import { MyListComponent } from './my-list/my-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
  {
    path: 'details/:type/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'mylist', component: MyListComponent, canActivate: [AuthGuard] },
  { path: '', component: SignInComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
