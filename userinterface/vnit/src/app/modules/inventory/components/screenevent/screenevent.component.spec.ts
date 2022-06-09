import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeneventComponent } from './screenevent.component';

describe('ScreeneventComponent', () => {
  let component: ScreeneventComponent;
  let fixture: ComponentFixture<ScreeneventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeneventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeneventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
