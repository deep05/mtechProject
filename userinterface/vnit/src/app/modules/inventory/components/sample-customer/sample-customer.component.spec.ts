import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCustomerComponent } from './sample-customer.component';

describe('SampleCustomerComponent', () => {
  let component: SampleCustomerComponent;
  let fixture: ComponentFixture<SampleCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
