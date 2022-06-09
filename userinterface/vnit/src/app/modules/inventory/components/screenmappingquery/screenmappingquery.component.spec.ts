import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenmappingqueryComponent } from './screenmappingquery.component';

describe('ScreenmappingqueryComponent', () => {
  let component: ScreenmappingqueryComponent;
  let fixture: ComponentFixture<ScreenmappingqueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenmappingqueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenmappingqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
