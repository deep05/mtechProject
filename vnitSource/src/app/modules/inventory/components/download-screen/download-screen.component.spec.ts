import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadScreenComponent } from './download-screen.component';

describe('DownloadScreenComponent', () => {
  let component: DownloadScreenComponent;
  let fixture: ComponentFixture<DownloadScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
