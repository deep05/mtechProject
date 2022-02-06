import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenmappingconditionComponent } from './screenmappingcondition.component';

describe('ScreenmappingconditionComponent', () => {
  let component: ScreenmappingconditionComponent;
  let fixture: ComponentFixture<ScreenmappingconditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenmappingconditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenmappingconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
