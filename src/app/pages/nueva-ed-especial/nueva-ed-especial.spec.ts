import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEdEspecial } from './nueva-ed-especial';

describe('NuevaEdEspecial', () => {
  let component: NuevaEdEspecial;
  let fixture: ComponentFixture<NuevaEdEspecial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaEdEspecial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaEdEspecial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
