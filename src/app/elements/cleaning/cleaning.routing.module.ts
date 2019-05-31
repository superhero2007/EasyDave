import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContainerComponent} from './container/container.component';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    data: {animation: 'cleaningBase'},
    children: [
      {
        path: '',
        redirectTo: '1',
        pathMatch: 'full'
      },
      {
        path: '1',
        component: FirstStepComponent,
        data: {animation: '1'}
      },
      {
        path: '2',
        component: SecondStepComponent,
        data: {animation: '2'}
      },
      {
        path: 'service',
        component: MainComponent,
        data: {animation: 'service'}
      },
      {
        path: '**',
        redirectTo: 'service',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleaningRoutingModule {
}
