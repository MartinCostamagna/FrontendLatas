import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCaja } from './nueva-caja';

describe('NuevaCaja', () => {
  let component: NuevaCaja;
  let fixture: ComponentFixture<NuevaCaja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCaja]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCaja);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
