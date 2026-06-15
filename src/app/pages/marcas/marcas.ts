import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Lata, Marca } from '../../interfaces/lata.interface';
import { MarcaService } from '../../services/marca.service';
import { LataService } from '../../services/lata.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './marcas.html',
  styleUrl: './marcas.css'
})
export class Marcas implements OnInit {
  // Inicializa el formulario de Registro
  formRegistro!: FormGroup;
  //Lista de marcas
  objetos: (Marca & { cantidad: number })[] = [];
  latas: Lata[] = [];
  estaLogueado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private marcaService: MarcaService,
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

    this.cargarYContarMarcas();
  }

  cargarYContarMarcas(): void {
    this.lataService.obtenerLatas().subscribe((dataLatas: Lata[]) => {
      this.latas = dataLatas;

      this.marcaService.obtenerMarcas().subscribe((dataMarcas: Marca[]) => {
        const marcasConConteo = dataMarcas.map(marca => {

          const latasDeEstaMarca = this.latas.filter(lata => lata.marca?.id === marca.id);

          return {
            ...marca,
            cantidad: latasDeEstaMarca.length
          };
        });

        this.objetos = marcasConConteo as (Marca & { cantidad: number })[];

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

  verObjetos(marca: number) {
    this.router.navigate(['/latas'], { queryParams: { marca: marca } });
  }

  guardarMarca(): void {
    if (this.formRegistro.valid) {
      const nuevaMarca = this.formRegistro.value;
      this.marcaService.registrarMarca(nuevaMarca).subscribe({

        next: (respuesta) => {
          window.alert('¡Marca guardada con éxito!');
          console.log('Marca guardada correctamente', respuesta);
          this.cargarYContarMarcas();
          this.formRegistro.reset();
        },

        error: (err) => {
          console.error('Hubo un error al guardar la marca:', err);
          window.alert(err);
        }
      });

    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}