import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/landing/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'authentication', loadChildren: () => import(`../app/components/authentication/authentication.module`).then(module => module.AuthenticationModule) },
  { path: 'cause', loadChildren: () => import(`../app/components/cause/cause.module`).then(module => module.CauseModule) },
  { path: 'event', loadChildren: () => import(`../app/components/event/event.module`).then(module => module.EventModule) },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
