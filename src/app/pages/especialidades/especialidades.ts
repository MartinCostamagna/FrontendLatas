import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Lata, Especialidad } from '../../interfaces/lata.interface';
import { EspecialidadService } from '../../services/especialidad.service';
import { LataService } from '../../services/lata.service';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.css'
})
export class Especialidades implements OnInit {
  // Inicializa el formulario de Registro
  formRegistro!: FormGroup;
  //Lista de especialidades
  objetos: (Especialidad & { cantidad: number })[] = [];
  latas: Lata[] = [];

  constructor(
    private fb: FormBuilder,
    private especialidadService: EspecialidadService,
    private lataService: LataService,
  ) { }

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.cargarYContarEspecialidades();
  }

  cargarYContarEspecialidades(): void {
    this.lataService.obtenerLatas().subscribe((dataLatas: Lata[]) => {
      this.latas = dataLatas;

      this.especialidadService.obtenerEspecialidades().subscribe((dataEspecialidades: Especialidad[]) => {
        const especialidadesConConteo = dataEspecialidades.map(especialidad => {

          const latasDeEstaEspecialidad = this.latas.filter(lata => lata.especialidad?.id === especialidad.id);

          return {
            ...especialidad,
            cantidad: latasDeEstaEspecialidad.length
          };
        });

        this.objetos = especialidadesConConteo as (Especialidad & { cantidad: number })[];

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


  guardarEspecialidad(): void {
    if (this.formRegistro.valid) {
      const nuevaEspecialidad = this.formRegistro.value;
      this.especialidadService.registrarEspecialidad(nuevaEspecialidad).subscribe({

        next: (respuesta) => {
          window.alert('¡Especialidad guardada con éxito!');
          console.log('Especialidad guardada correctamente', respuesta);
          this.cargarYContarEspecialidades();
          this.formRegistro.reset();
        },

        error: (err) => {
          console.error('Hubo un error al guardar la especialidad:', err);
        }
      });

    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}
