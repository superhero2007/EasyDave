import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/animations';
import { MatTabChangeEvent } from '@angular/material';
@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  
  animations:[
    routerTransition
  ]
})
export class FirstStepComponent implements OnInit {
  public selectedIndex =0;

  constructor(private router: Router
    ) { }

  ngOnInit() {
  }
  onSubmitFw(){
    //console.log(this.form.action);
    this.router.navigateByUrl('home-cleaning/2');
  }
  nextStep() {}
  onSubmit(){}
}
