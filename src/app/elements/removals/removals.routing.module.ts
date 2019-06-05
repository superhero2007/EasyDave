import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { MainComponent } from './components/main/main.component';
import { IncludedComponent } from './components/included/included.component';


const routes: Routes = [
  {
    path: 'what-is-included',
    component: IncludedComponent,
    data: { animation: 'removalsBase' },
  },
  // {
  //   path: '',
  //   component: ContainerComponent,
  //   data: { animation: 'removalsBase' },
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'service',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'service',
  //       component: MainComponent,
  //       data: { animation: 'service' }
  //     },
  //     {
  //       path: '**',
  //       redirectTo: 'service',
  //       pathMatch: 'full'
  //     },
  //   ]
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemovalsRoutingModule {
}
