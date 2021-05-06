import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroportComponent } from './airport.component';

describe('AeroportComponent', () => {
  let component: AeroportComponent;
  let fixture: ComponentFixture<AeroportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeroportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeroportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
