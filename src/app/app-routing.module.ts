import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path : 'albums',
    component : AlbumsComponent
  },
  {
    path: '',
    redirectTo : '/albums',
    pathMatch : 'full' 
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'album/:id',
    component : AlbumDescriptionComponent
  },
  {
    path : '**',
    component : PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
