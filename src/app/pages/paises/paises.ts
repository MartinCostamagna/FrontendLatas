import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Lata, Pais } from '../../interfaces/lata.interface';
import { PaisService } from '../../services/pais.service';
import { LataService } from '../../services/lata.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-paises',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './paises.html',
  styleUrl: './paises.css'
})
export class Paises implements OnInit {
  // Inicializa el formulario de Registro
  formRegistro!: FormGroup;
  //Lista de paises
  objetos: (Pais & { cantidad: number })[] = [];
  latas: Lata[] = [];
  estaLogueado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paisService: PaisService,
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

    this.cargarYContarPaises();
  }

  cargarYContarPaises(): void {
    this.lataService.obtenerLatas().subscribe((dataLatas: Lata[]) => {
      this.latas = dataLatas;

      this.paisService.obtenerPaises().subscribe((dataPaises: Pais[]) => {
        const paisesConConteo = dataPaises.map(pais => {

          const latasDeEstePais = this.latas.filter(lata => lata.pais?.id === pais.id);

          return {
            ...pais,
            cantidad: latasDeEstePais.length
          };
        });

        this.objetos = paisesConConteo as (Pais & { cantidad: number })[];

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

  verObjetos(pais: number) {
    this.router.navigate(['/latas'], { queryParams: { pais: pais } });
  }

  guardarPais(): void {
    if (this.formRegistro.valid) {
      const nuevoPais = this.formRegistro.value;
      this.paisService.registrarPais(nuevoPais).subscribe({

        next: (respuesta) => {
          window.alert('¡País guardado con éxito!');
          console.log('País guardado correctamente', respuesta);
          this.cargarYContarPaises();
          this.formRegistro.reset();
        },

        error: (err) => {
          console.error('Hubo un error al guardar el país:', err);
        }
      });

    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}
