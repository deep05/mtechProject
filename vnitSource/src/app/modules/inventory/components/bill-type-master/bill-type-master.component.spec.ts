import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTypeMasterComponent } from './bill-type-master.component';

describe('BillTypeMasterComponent', () => {
  let component: BillTypeMasterComponent;
  let fixture: ComponentFixture<BillTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
