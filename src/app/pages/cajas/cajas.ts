import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Caja, Tamano } from '../../interfaces/lata.interface';
import { CajaService } from '../../services/caja.service';
import { TamanoService } from '../../services/tamano.service';

@Component({
  selector: 'app-cajas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cajas.html',
  styleUrl: './cajas.css'
})
export class Cajas implements OnInit {
  // Inicializa el formulario de Registro
  formRegistro!: FormGroup;
  //Lista de cajas
  objetos: Caja[] = [];
  tamanos: Tamano[] = [];
  // Caja en Edición
  cajaEnEdicion: Caja | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cajaService: CajaService,
    private tamanoService: TamanoService,
  ) { }

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      numeroDeCaja: ['', Validators.required],
      tamañoId: [''],
      cantidadActual: ['0', Validators.required]
    });

    this.cargarCajas();
    this.cargarTamanos();
  }

  cargarCajas(): void {
    this.cajaService.obtenerCajas().subscribe((dataCajas: Caja[]) => {
      this.objetos = dataCajas.sort((a, b) => a.numeroDeCaja - b.numeroDeCaja);
    });
  }

  cargarTamanos(): void {
    this.tamanoService.obtenerTamanos().subscribe((data: Tamano[]) => {
      this.tamanos = data.sort((a, b) => a.volumen - b.volumen);
    });
  }

  cargarCajaEnFormulario(caja: Caja, event: Event): void {
    event.stopPropagation();
    this.cajaEnEdicion = caja;

    const idDelTamano = caja.tamañoId?.id || caja.tamañoId || '';

    this.formRegistro.patchValue({
      numeroDeCaja: caja.numeroDeCaja,
      tamañoId: idDelTamano,
      cantidadActual: caja.cantidadActual
    });

    this.formRegistro.get('numeroDeCaja')?.disable();
  }

  verObjetos(numeroDeCaja: number) {
    this.router.navigate(['/latas'], { queryParams: { caja: numeroDeCaja } });
  }

  cancelarEdicion(): void {
    this.cajaEnEdicion = null;
    this.formRegistro.enable();
    this.formRegistro.reset({
      numeroDeCaja: '',
      tamañoId: '',
      cantidadActual: '0'
    });
  }

  guardarOActualizarCaja(): void {
    if (this.formRegistro.valid) {
      const valores = this.formRegistro.getRawValue();

      const datosCaja: any = {
        numeroDeCaja: Number(valores.numeroDeCaja),
        cantidadActual: Number(valores.cantidadActual)
      };

      if (valores.tamañoId) {
        datosCaja.tamañoId = Number(valores.tamañoId);
      }

      if (this.cajaEnEdicion) {
        this.cajaService.actualizarCaja(this.cajaEnEdicion.numeroDeCaja, datosCaja).subscribe({
          next: () => {
            window.alert('¡Caja actualizada!');
            this.cargarCajas();
            this.cancelarEdicion();
          },
          error: (err) => console.error(err)
        });
      }

      else {
        this.cajaService.registrarCaja(datosCaja).subscribe({
          next: () => {
            window.alert('¡Caja guardada con éxito!');
            this.cargarCajas();
            this.cancelarEdicion();
          },
          error: (err) => console.error(err)
        });
      }
    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}
