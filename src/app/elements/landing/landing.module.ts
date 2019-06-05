
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ContainerComponent } from './container/container.component';
import { LandingRoutingModule } from './landing.routing.module';
import { LandingService } from './services/landing.service';
import { MainComponent } from './components/main/main.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({ 
  declarations: [ContainerComponent, MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    LandingRoutingModule,
    InlineSVGModule.forRoot(),
  ],
  providers: [
    LandingService,
  ]
})
export class LandingModule {
  
 }

