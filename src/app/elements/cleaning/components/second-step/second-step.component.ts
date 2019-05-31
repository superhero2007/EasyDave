import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  routerTransition } from 'src/app/animations';
@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  animations:[
    routerTransition
  ]
    
  
})
export class SecondStepComponent implements OnInit {

  constructor(private router: Router
    ) { }

  ngOnInit() {
  }
  onSubmitBk(){
    //console.log(this.form.action);
    this.router.navigateByUrl('home-cleaning/1');
  }
  onSubmitFw(){
    //console.log(this.form.action);
    this.router.navigateByUrl('home-cleaning/3');
  }
  nextStep() {}
  onSubmit(){}
}
