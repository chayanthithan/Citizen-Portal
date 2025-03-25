import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCertificatesComponent } from './generate-certificates.component';

describe('GenerateCertificatesComponent', () => {
  let component: GenerateCertificatesComponent;
  let fixture: ComponentFixture<GenerateCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateCertificatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
