import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadbillComponent } from './uploadbill.component';

describe('UploadbillComponent', () => {
  let component: UploadbillComponent;
  let fixture: ComponentFixture<UploadbillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadbillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
