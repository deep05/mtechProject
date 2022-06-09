import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenjoinconditionComponent } from './screenjoincondition.component';

describe('ScreenjoinconditionComponent', () => {
  let component: ScreenjoinconditionComponent;
  let fixture: ComponentFixture<ScreenjoinconditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenjoinconditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenjoinconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
