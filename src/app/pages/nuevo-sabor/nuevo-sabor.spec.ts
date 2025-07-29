import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSabor } from './nuevo-sabor';

describe('NuevoSabor', () => {
  let component: NuevoSabor;
  let fixture: ComponentFixture<NuevoSabor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoSabor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoSabor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
