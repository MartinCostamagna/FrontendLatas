import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Lata, Especialidad } from '../../interfaces/lata.interface';
import { EspecialidadService } from '../../services/especialidad.service';
import { LataService } from '../../services/lata.service';
import { AuthService } from '../../services/auth.service';

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
  estaLogueado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private especialidadService: EspecialidadService,
    private lataService: LataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(estado => {
      this.estaLogueado = estado;
    });

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

  verObjetos(especialidad: number) {
    this.router.navigate(['/latas'], { queryParams: { especialidad: especialidad } });
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
