import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Lata, Tamano } from '../../interfaces/lata.interface';
import { TamanoService } from '../../services/tamano.service';
import { LataService } from '../../services/lata.service';

@Component({
  selector: 'app-tamanios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tamanios.html',
  styleUrl: './tamanios.css'
})
export class Tamanios implements OnInit {
  // Inicializa el formulario de Registro
  formRegistro!: FormGroup;
  //Lista de tamaños
  objetos: (Tamano & { cantidad: number })[] = [];
  latas: Lata[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tamanoService: TamanoService,
    private lataService: LataService,
  ) { }

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      volumen: ['', Validators.required]
    });

    this.cargarYContarTamanos();
  }

  cargarYContarTamanos(): void {
    this.lataService.obtenerLatas().subscribe((dataLatas: Lata[]) => {
      this.latas = dataLatas;

      this.tamanoService.obtenerTamanos().subscribe((dataTamanos: Tamano[]) => {
        const tamanosConConteo = dataTamanos.map(tamano => {

          const latasDeEsteTamano = this.latas.filter(lata => lata.tamaño?.id === tamano.id);

          return {
            ...tamano,
            cantidad: latasDeEsteTamano.length
          };
        });

        this.objetos = tamanosConConteo as (Tamano & { cantidad: number })[];

        this.ordenarPorVolumen();
      });
    });
  }

  ordenarPorVolumen(): void {
    this.objetos.sort((a, b) => a.volumen - b.volumen);
  }

  ordenarPorCantidad(): void {
    this.objetos.sort((a, b) => b.cantidad - a.cantidad);
  }

  verObjetos(tamano: number) {
    this.router.navigate(['/latas'], { queryParams: { tamano: tamano } });
  }

  guardarTamano(): void {
    if (this.formRegistro.valid) {
      const nuevoTamano = this.formRegistro.value;
      this.tamanoService.registrarTamano(nuevoTamano).subscribe({

        next: (respuesta) => {
          window.alert('¡Tamaño guardado con éxito!');
          console.log('Tamaño guardado correctamente', respuesta);
          this.cargarYContarTamanos();
          this.formRegistro.reset();
        },

        error: (err) => {
          console.error('Hubo un error al guardar el tamaño:', err);
        }
      });

    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}
