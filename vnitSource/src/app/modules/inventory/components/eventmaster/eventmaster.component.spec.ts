import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventmasterComponent } from './eventmaster.component';

describe('EventmasterComponent', () => {
  let component: EventmasterComponent;
  let fixture: ComponentFixture<EventmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
