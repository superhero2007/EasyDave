import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludedComponent } from './included.component';


describe('IncludedComponent', () => {
  let component: IncludedComponent
  ;
  let fixture: ComponentFixture<IncludedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
