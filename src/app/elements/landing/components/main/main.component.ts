import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/animations';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';
declare module 'googlemaps';
import { } from "googlemaps";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({ 
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class MainComponent implements OnInit {
  public selectedIndex: number = 0;
  firstFormGroup: FormGroup;
  public from: string = "";
  isOpen = true;
  email = new FormControl('', [Validators.email]);
  constructor(private _formBuilder: FormBuilder) { }


  @Input() adressType: string; 
  @Output() setAddress: EventEmitter<any> = new EventEmitter();


  autocompleteInputFrom: string;
  autocompleteInputTo: string;
  queryWait: boolean;


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    console.log(this.selectedIndex);
   
  }


  onSubmitBk() {
    //console.log(this.form.action);
    // this.router.navigateByUrl('cleaning/1');
  }
  onSubmitFw() {
    //console.log(this.form.action);
    // this.router.navigateByUrl('cleaning/3');
  }
  public nextStep(value,email) {
    this.selectedIndex += 1;
    console.log(this.selectedIndex);
    console.log(value);
    console.log(email);

  }

  public previousStep() {
    this.selectedIndex -= 1;
    console.log(this.selectedIndex);
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
    console.log(this.selectedIndex);
  }



}
