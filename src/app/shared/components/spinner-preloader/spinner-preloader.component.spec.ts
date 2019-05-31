import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPreloaderComponent } from './spinner-preloader.component';

describe('SpinnerPreloaderComponent', () => {
  let component: SpinnerPreloaderComponent;
  let fixture: ComponentFixture<SpinnerPreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerPreloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
