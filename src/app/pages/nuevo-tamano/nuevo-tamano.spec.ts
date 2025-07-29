import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTamano } from './nuevo-tamano';

describe('NuevoTamano', () => {
  let component: NuevoTamano;
  let fixture: ComponentFixture<NuevoTamano>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoTamano]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoTamano);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
