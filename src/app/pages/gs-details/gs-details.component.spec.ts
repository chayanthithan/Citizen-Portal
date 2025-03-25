import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsDetailsComponent } from './gs-details.component';

describe('GsDetailsComponent', () => {
  let component: GsDetailsComponent;
  let fixture: ComponentFixture<GsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
