import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaLata } from './nueva-lata';

describe('NuevaLata', () => {
  let component: NuevaLata;
  let fixture: ComponentFixture<NuevaLata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaLata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaLata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
