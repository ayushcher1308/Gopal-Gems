import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondDetailsComponent } from './diamond-details.component';

describe('DiamondDetailsComponent', () => {
  let component: DiamondDetailsComponent;
  let fixture: ComponentFixture<DiamondDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiamondDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
