import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Lata, EdicionEspecial } from '../../interfaces/lata.interface';
import { EdicionEspecialService } from '../../services/edicionEspecial.service';
import { LataService } from '../../services/lata.service';

@Component({
  selector: 'app-ediciones-especiales',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ediciones-especiales.html',
  styleUrl: './ediciones-especiales.css'
})
export class EdicionesEspeciales implements OnInit {
  // Inicializa el formulario de Registro
  formRegistro!: FormGroup;
  //Lista de ediciones especiales
  objetos: (EdicionEspecial & { cantidad: number })[] = [];
  latas: Lata[] = [];

  constructor(
    private fb: FormBuilder,
    private edicionEspecialService: EdicionEspecialService,
    private lataService: LataService,
  ) { }

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.cargarYContarEdicionesEspeciales();
  }

  cargarYContarEdicionesEspeciales(): void {
    this.lataService.obtenerLatas().subscribe((dataLatas: Lata[]) => {
      this.latas = dataLatas;

      this.edicionEspecialService.obtenerEdicionesEspeciales().subscribe((dataEdiciones: EdicionEspecial[]) => {
        const edicionesConConteo = dataEdiciones.map(edicion => {

          const latasDeEstaEdicion = this.latas.filter(lata => lata.edicionEspecial?.id === edicion.id);

          return {
            ...edicion,
            cantidad: latasDeEstaEdicion.length
          };
        });

        this.objetos = edicionesConConteo as (EdicionEspecial & { cantidad: number })[];

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


  guardarEdicionEspecial(): void {
    if (this.formRegistro.valid) {
      const nuevaEdicion = this.formRegistro.value;
      this.edicionEspecialService.registrarEdicionEspecial(nuevaEdicion).subscribe({

        next: (respuesta) => {
          window.alert('¡Edición especial guardada con éxito!');
          console.log('Edición especial guardada correctamente', respuesta);
          this.cargarYContarEdicionesEspeciales();
          this.formRegistro.reset();
        },

        error: (err) => {
          console.error('Hubo un error al guardar la edición especial:', err);
        }
      });

    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}
