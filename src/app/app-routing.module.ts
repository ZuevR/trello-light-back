import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'boards', component: MainPageComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(value => value.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
