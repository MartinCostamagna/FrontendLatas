import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLata } from './editar-lata';

describe('EditarLata', () => {
  let component: EditarLata;
  let fixture: ComponentFixture<EditarLata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarLata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarLata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
