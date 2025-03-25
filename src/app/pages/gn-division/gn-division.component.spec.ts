import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnDivisionComponent } from './gn-division.component';

describe('GnDivisionComponent', () => {
  let component: GnDivisionComponent;
  let fixture: ComponentFixture<GnDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GnDivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GnDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
