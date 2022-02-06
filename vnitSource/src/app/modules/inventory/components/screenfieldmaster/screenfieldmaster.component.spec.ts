import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenfieldmasterComponent } from './screenfieldmaster.component';

describe('ScreenfieldmasterComponent', () => {
  let component: ScreenfieldmasterComponent;
  let fixture: ComponentFixture<ScreenfieldmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenfieldmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenfieldmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
