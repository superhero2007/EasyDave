import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterAnimationBaseComponent } from './router-animation-base.component';

describe('RouterAnimationBaseComponent', () => {
  let component: RouterAnimationBaseComponent;
  let fixture: ComponentFixture<RouterAnimationBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterAnimationBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterAnimationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
