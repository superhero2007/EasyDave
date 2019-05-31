
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ContainerComponent } from './container/container.component';
import { RemovalsRoutingModule } from './removals.routing.module';
import { MainComponent } from './components/main/main.component';
import { RemovalsService } from './services/removals.service';
import { AgmCoreModule } from '@agm/core';

@NgModule({ 
  declarations: [ContainerComponent, MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RemovalsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAE4kXAa7ZkygiVgF33Oq7z7vjPNVGwBdU'
    }),
  ],
  providers: [
    RemovalsService,
  ]
})
export class RemovalsModule {
  
 }

