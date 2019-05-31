import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation, transAddress } from 'src/app/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';
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
    transAddress
  ]
})
export class MainComponent implements OnInit {
  public selectedIndex: number = 0;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  mapVisible: boolean = true;
  inputVisible: boolean = true;
  panelOpenState = false;
  xpandStatus: boolean = false;
  isOpenAddress = false;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    var mapProp = {
      center: new google.maps.LatLng(51.5074, 0.1278),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true,
      
    };
this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }


  onSubmitBk() {
    //console.log(this.form.action);
    // this.router.navigateByUrl('cleaning/1');
  }
  onSubmitFw() {
    //console.log(this.form.action);
    // this.router.navigateByUrl('cleaning/3');
  }
  public nextStep() {
    this.selectedIndex += 1;
  }

  public previousStep() {
    this.selectedIndex -= 1;
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  public mapToggle(value) {
    this.mapVisible = value

  }
  public inputToggle(value) {
    this.inputVisible = value

  }

  togglePanel() {
    this.xpandStatus = false;
  }

  toggleAddress() {
    this.isOpenAddress = !this.isOpenAddress;
  }
  closeAddress() {
    this.isOpenAddress=false;
    
  }

}
