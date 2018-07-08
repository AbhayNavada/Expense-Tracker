import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualInGroupReportComponent } from './individual-in-group-report.component';

describe('IndividualInGroupReportComponent', () => {
  let component: IndividualInGroupReportComponent;
  let fixture: ComponentFixture<IndividualInGroupReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualInGroupReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualInGroupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
