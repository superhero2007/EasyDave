import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContainerComponent} from './container/container.component';

import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    data: {animation: 'landingBase'},
    children: [
      {
        path: '',
        component: MainComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        component: MainComponent,
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
}
