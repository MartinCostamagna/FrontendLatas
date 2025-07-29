import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPais } from './nuevo-pais';

describe('NuevoPais', () => {
  let component: NuevoPais;
  let fixture: ComponentFixture<NuevoPais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoPais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoPais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
