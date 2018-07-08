import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveghComponent } from './removegh.component';

describe('RemoveghComponent', () => {
  let component: RemoveghComponent;
  let fixture: ComponentFixture<RemoveghComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveghComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
