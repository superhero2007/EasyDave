import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CleaningModule} from './elements/cleaning/cleaning.module';
import { RemovalsRoutingModule } from './elements/removals/removals.routing.module';

const routes: Routes = [
  {
    path: 'home-cleaning',
    loadChildren: './elements/cleaning/cleaning.module#CleaningModule',
    data: {animation: 'cleaning'}
  },
  {
    path: 'home-removals',
    loadChildren: './elements/removals/removals.module#RemovalsModule',
    data: {animation: 'removals'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
