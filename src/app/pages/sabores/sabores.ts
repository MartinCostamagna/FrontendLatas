import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lata, Sabor } from '../../interfaces/lata.interface';
import { LataService } from '../../services/lata.service';
import { SaborService } from '../../services/sabor.service';

@Component({
  selector: 'app-sabores',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sabores.html',
  styleUrl: './sabores.css'
})
export class Sabores implements OnInit {
  // Inicializa el formulario de Registro
  formRegistro!: FormGroup;
  //Lista de sabores
  objetos: (Sabor & { cantidad: number })[] = [];
  latas: Lata[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private saborService: SaborService,
    private lataService: LataService,
  ) { }

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.cargarYContarSabores();
  }

  cargarYContarSabores(): void {
    this.lataService.obtenerLatas().subscribe((dataLatas: Lata[]) => {
      this.latas = dataLatas;

      this.saborService.obtenerSabores().subscribe((dataSabores: Sabor[]) => {
        const saboresConConteo = dataSabores.map(sabor => {

          const latasDeEsteSabor = this.latas.filter(lata => lata.sabor?.id === sabor.id);

          return {
            ...sabor,
            cantidad: latasDeEsteSabor.length
          };
        });

        this.objetos = saboresConConteo as (Sabor & { cantidad: number })[];

        this.ordenarAlfabeticamente();
      });
    });
  }

  ordenarAlfabeticamente(): void {
    this.objetos.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );
  }

  ordenarPorCantidad(): void {
    this.objetos.sort((a, b) => b.cantidad - a.cantidad);
  }

  verObjetos(sabor: number) {
    this.router.navigate(['/latas'], { queryParams: { sabor: sabor } });
  }

  guardarSabor(): void {
    if (this.formRegistro.valid) {
      const nuevoSabor = this.formRegistro.value;
      this.saborService.registrarSabor(nuevoSabor).subscribe({

        next: (respuesta) => {
          window.alert('¡Sabor guardado con éxito!');
          console.log('Sabor guardado correctamente', respuesta);
          this.cargarYContarSabores();
          this.formRegistro.reset();
        },

        error: (err) => {
          console.error('Hubo un error al guardar el sabor:', err);
        }
      });

    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}
