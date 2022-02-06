import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenlistComponent } from './screenlist.component';

describe('ScreenlistComponent', () => {
  let component: ScreenlistComponent;
  let fixture: ComponentFixture<ScreenlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
