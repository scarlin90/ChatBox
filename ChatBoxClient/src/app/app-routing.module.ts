
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserSelectionComponent } from './user-selection/user-selection.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: '**', component: UserSelectionComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
