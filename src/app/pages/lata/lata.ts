import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'
//services
import { AuthService } from '../../services/auth.service';
import { MarcaService } from '../../services/marca.service';
import { SaborService } from '../../services/sabor.service';
import { TamanoService } from '../../services/tamano.service';
import { EdicionEspecialService } from '../../services/edicionEspecial.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { DescripcionService } from '../../services/descripcion.service';
import { PaisService } from '../../services/pais.service';
import { CajaService } from '../../services/caja.service';
import { LataService } from '../../services/lata.service';
import { Lata, Marca, Tamano, Sabor, Especialidad, EdicionEspecial, Descripcion, Pais, Caja } from '../../interfaces/lata.interface';

@Component({
  selector: 'app-lata',
  imports: [FormsModule],
  templateUrl: './lata.html',
  styleUrl: './lata.css'
})
export class LataDetalle implements OnInit {
  // Variable para almacenar lata seleccionada
  lataSeleccionada: Lata | undefined;
  estaLogueado: boolean = false;
  modoEdicion: boolean = false;
  lataEditada: any = {}
  marcas: Marca[] = [];
  sabores: Sabor[] = [];
  tamanos: Tamano[] = []
  especialidades: Especialidad[] = [];
  edicionesEspeciales: EdicionEspecial[] = []
  descripciones: Descripcion[] = [];
  paises: Pais[] = []
  cajas: Caja[] = [];
  anios: number[] = Array.from({ length: 2100 - 1930 + 1 }, (_, i) => 1930 + i);

  constructor(
    private route: ActivatedRoute,
    private lataService: LataService,
    private authService: AuthService,
    private marcaService: MarcaService,
    private saborService: SaborService,
    private tamanoService: TamanoService,
    private edicionEspecialService: EdicionEspecialService,
    private especialidadService: EspecialidadService,
    private descripcionService: DescripcionService,
    private paisService: PaisService,
    private cajaService: CajaService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(estado => {
      this.estaLogueado = estado;
    });

    this.cargarDatosLata();
  }

  cargarDatosLata() {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        const idLata = Number(idString);
        this.lataService.obtenerLataPorId(idLata).subscribe(lata => {
          this.lataSeleccionada = lata;
        });
      }
    });
  }

  obtenerUrlImagen(rutaParcial: string | null | undefined): string {
    if (!rutaParcial) {
      return 'assets/imagen-por-defecto.png';
    }

    const rutaLimpia = rutaParcial.replace(/\\/g, '/');
    const rutaCodificada = rutaLimpia
      .split('/')
      .map(parte => encodeURIComponent(parte))
      .join('/');

    const urlBackend = 'https://backendlatas-production.up.railway.app';
    return `${urlBackend}/static/imagenes/${rutaCodificada}`;
  }

  editarLata() {
    this.modoEdicion = true;

    this.lataEditada = {
      marcaId: this.lataSeleccionada?.marca?.id,
      tamanoId: this.lataSeleccionada?.['tamaño']?.id,
      saborId: this.lataSeleccionada?.sabor?.id,
      especialidadId: this.lataSeleccionada?.especialidad?.id,
      edicionEspecialId: this.lataSeleccionada?.edicionEspecial?.id || null,
      descripcionId: this.lataSeleccionada?.descripcion?.id || null,
      paisId: this.lataSeleccionada?.pais?.id,
      numeroDeCaja: this.lataSeleccionada?.caja?.numeroDeCaja || null,
      anio: this.lataSeleccionada?.anio,
      edicionLimitada: this.lataSeleccionada?.edicionLimitada || false
    };

    this.cargarDatos();
  }

  guardarLata() {
    if (!this.lataSeleccionada || !this.lataSeleccionada.id) return;

    const payloadParaElBackend = {
      marcaId: Number(this.lataEditada.marcaId),
      tamañoId: Number(this.lataEditada.tamanoId),
      saborId: Number(this.lataEditada.saborId),
      especialidadId: Number(this.lataEditada.especialidadId),
      edicionLimitada: this.lataEditada.edicionLimitada,
      edicionEspecialId: this.lataEditada.edicionEspecialId ? Number(this.lataEditada.edicionEspecialId) : null,
      descripcionId: this.lataEditada.descripcionId ? Number(this.lataEditada.descripcionId) : null,
      anio: Number(this.lataEditada.anio),
      paisId: Number(this.lataEditada.paisId),
      numeroDeCaja: this.lataEditada.numeroDeCaja ? Number(this.lataEditada.numeroDeCaja) : null
    };

    console.log('Enviando actualización...', payloadParaElBackend);

    this.lataService.actualizarLata(this.lataSeleccionada.id, payloadParaElBackend).subscribe({
      next: (respuesta) => {
        console.log('¡Lata actualizada con éxito!', respuesta);
        this.modoEdicion = false;
        this.cargarDatosLata();
      },
      error: (err) => {
        console.error('Error al actualizar la lata:', err);
        alert('Hubo un problema al guardar los cambios. Mirá la consola.');
      }
    });
  }

  cargarDatos() {
    // Cargar Marcas
    this.marcaService.obtenerMarcas().subscribe({
      next: data => { this.marcas = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar marcas:', err)
    });

    // Cargar Tamaños
    this.tamanoService.obtenerTamanos().subscribe({
      next: data => { this.tamanos = data.sort((a, b) => a.volumen - b.volumen); },
      error: err => console.error('Error al cargar tamaños:', err)
    });

    // Cargar Sabores
    this.saborService.obtenerSabores().subscribe({
      next: data => { this.sabores = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar sabores:', err)
    });

    // Cargar Especialidades
    this.especialidadService.obtenerEspecialidades().subscribe({
      next: data => { this.especialidades = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar especialidades:', err)
    });

    // Cargar Ediciones Especiales
    this.edicionEspecialService.obtenerEdicionesEspeciales().subscribe({
      next: data => { this.edicionesEspeciales = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar ediciones especiales:', err)
    });

    // Cargar Descripciones
    this.descripcionService.obtenerDescripciones().subscribe({
      next: data => { this.descripciones = data.sort((a, b) => a.texto.localeCompare(b.texto)); },
      error: err => console.error('Error al cargar descripciones:', err)
    });

    // Cargar Países
    this.paisService.obtenerPaises().subscribe({
      next: data => { this.paises = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar países:', err)
    });

    // Cargar Cajas
    this.cajaService.obtenerCajas().subscribe({
      next: data => { this.cajas = data.sort((a, b) => a.numeroDeCaja - b.numeroDeCaja); },
      error: err => console.error('Error al cargar cajas:', err)
    });
  }

  cancelar() {
    this.modoEdicion = false;
  }
}
