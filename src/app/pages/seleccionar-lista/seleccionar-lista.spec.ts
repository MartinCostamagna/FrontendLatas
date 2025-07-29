import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarLista } from './seleccionar-lista';

describe('SeleccionarLista', () => {
  let component: SeleccionarLista;
  let fixture: ComponentFixture<SeleccionarLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
