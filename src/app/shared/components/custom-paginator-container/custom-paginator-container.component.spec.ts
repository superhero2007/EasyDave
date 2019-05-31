import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPaginatorContainerComponent } from './custom-paginator-container.component';

describe('CustomPaginatorContainerComponent', () => {
  let component: CustomPaginatorContainerComponent;
  let fixture: ComponentFixture<CustomPaginatorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPaginatorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPaginatorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
