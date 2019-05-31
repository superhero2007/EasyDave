import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { ContainerComponent } from './container/container.component';
import { CleaningRoutingModule } from './cleaning.routing.module';
import { CleaningService } from './services/cleaning.service';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { MainComponent } from './components/main/main.component';

@NgModule({ 
  declarations: [ContainerComponent, FirstStepComponent,SecondStepComponent,MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CleaningRoutingModule,
  ],
  providers: [
    CleaningService,
  ]
})
export class CleaningModule {
  
 }

