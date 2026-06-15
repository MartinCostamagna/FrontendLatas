import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Lata, Marca, Tamano, Sabor, Especialidad, EdicionEspecial, Pais } from '../../interfaces/lata.interface';
import { LataService } from '../../services/lata.service';
import { MarcaService } from '../../services/marca.service';
import { TamanoService } from '../../services/tamano.service';
import { SaborService } from '../../services/sabor.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { EdicionEspecialService } from '../../services/edicionEspecial.service';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-listado',
  imports: [FormsModule, RouterLink],
  templateUrl: './listado.html',
  styleUrl: './listado.css'
})

export class Listado implements OnInit {
  // listas para objetos
  latasOriginales: Lata[] = [];
  latas: Lata[] = [];
  marcas: Marca[] = [];
  tamanos: Tamano[] = []
  sabores: Sabor[] = []
  especialidades: Especialidad[] = []
  edicionesEspeciales: EdicionEspecial[] = []
  anios: number[] = [];
  paises: Pais[] = []
  filtros = {
    marca: '',
    tamano: '',
    sabor: '',
    especialidad: '',
    edLimitada: '',
    edEspecial: '',
    anio: '',
    pais: '',
    caja: ''
  };
  vistaActual: 'cuadricula' | 'lista' = 'cuadricula';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marcaService: MarcaService,
    private tamanoService: TamanoService,
    private saborService: SaborService,
    private especialidadService: EspecialidadService,
    private edicionEspecialService: EdicionEspecialService,
    private paisService: PaisService,
    private lataService: LataService
  ) { }

  ngOnInit() {
    //carga datos a selects
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    // Cargar Latas
    this.lataService.obtenerLatas().subscribe({
      next: data => {
        const latasOrdenadas = data.sort((a, b) => {
          const marcaA = a.marca?.nombre?.toLowerCase() || '';
          const marcaB = b.marca?.nombre?.toLowerCase() || '';

          if (marcaA < marcaB) return -1;
          if (marcaA > marcaB) return 1;

          const tamanoA = a['tamaño']?.volumen || 0;
          const tamanoB = b['tamaño']?.volumen || 0;

          if (tamanoA !== tamanoB) {
            return tamanoB - tamanoA;
          }

          const paisA = a.pais?.nombre?.toLowerCase() || '';
          const paisB = b.pais?.nombre?.toLowerCase() || '';

          const pesoA = paisA === 'argentina' ? 1 : 0;
          const pesoB = paisB === 'argentina' ? 1 : 0;

          if (pesoA !== pesoB) {
            return pesoA - pesoB;
          }

          return paisA.localeCompare(paisB);
        });

        this.latas = latasOrdenadas;
        this.latasOriginales = [...latasOrdenadas];

        const todosLosAnios = data.map(lata => lata.anio);
        const aniosUnicos = [...new Set(todosLosAnios)];
        this.anios = aniosUnicos.sort((a, b) => a - b);

        this.route.queryParams.subscribe(params => {
          if (params['caja']) {
            this.filtros.caja = params['caja'];
            this.filtrarLatas();
          }
          if (params['marca']) {
            this.filtros.marca = params['marca'];
            this.filtrarLatas();
          }
          if (params['tamano']) {
            this.filtros.tamano = params['tamano'];
            this.filtrarLatas();
          }
          if (params['sabor']) {
            this.filtros.sabor = params['sabor'];
            this.filtrarLatas();
          }
          if (params['especialidad']) {
            this.filtros.especialidad = params['especialidad'];
            this.filtrarLatas();
          }
          if (params['edEspecial']) {
            this.filtros.edEspecial = params['edEspecial'];
            this.filtrarLatas();
          }
          if (params['pais']) {
            this.filtros.pais = params['pais'];
            this.filtrarLatas();
          }
          if (params['anio']) {
            this.filtros.anio = params['anio'];
            this.filtrarLatas();
          }
        });
      },
      error: err => console.error('Error al cargar latas:', err)
    });

    // Cargar Marcas
    this.marcaService.obtenerMarcas().subscribe({
      next: data => { this.marcas = data.sort((a, b) => a.nombre.localeCompare(b.nombre)) },
      error: err => console.error('Error al cargar marcas:', err)
    });

    // Cargar Tamaños
    this.tamanoService.obtenerTamanos().subscribe({
      next: data => { this.tamanos = data.sort((a, b) => a.volumen - b.volumen) },
      error: err => console.error('Error al cargar tamaños:', err)
    });

    // Cargar Sabores
    this.saborService.obtenerSabores().subscribe({
      next: data => { this.sabores = data.sort((a, b) => a.nombre.localeCompare(b.nombre)) },
      error: err => console.error('Error al cargar sabores:', err)
    });

    // Cargar Especialidades
    this.especialidadService.obtenerEspecialidades().subscribe({
      next: data => { this.especialidades = data.sort((a, b) => a.nombre.localeCompare(b.nombre)) },
      error: err => console.error('Error al cargar especialidades:', err)
    });

    // Cargar Ediciones Especiales
    this.edicionEspecialService.obtenerEdicionesEspeciales().subscribe({
      next: data => { this.edicionesEspeciales = data.sort((a, b) => a.nombre.localeCompare(b.nombre)) },
      error: err => console.error('Error al cargar ediciones especiales:', err)
    });

    // Cargar Países
    this.paisService.obtenerPaises().subscribe({
      next: data => { this.paises = data.sort((a, b) => a.nombre.localeCompare(b.nombre)) },
      error: err => console.error('Error al cargar países:', err)
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

    const urlBackend = 'http://localhost:3000';
    return `${urlBackend}/static/imagenes/${rutaCodificada}`;
  }

  cambiarVista(vista: 'cuadricula' | 'lista') {
    this.vistaActual = vista;
  }

  filtrarLatas() {
    this.latas = this.latasOriginales.filter(lata => {
      const matchMarca = this.filtros.marca ? String(lata.marca?.id) === this.filtros.marca : true;
      const matchTamano = this.filtros.tamano ? String(lata['tamaño']?.id) === this.filtros.tamano : true;
      const matchSabor = this.filtros.sabor ? String(lata.sabor?.id) === this.filtros.sabor : true;
      const matchEspecialidad = this.filtros.especialidad ? String(lata.especialidad?.id) === this.filtros.especialidad : true;
      let matchEdLimitada = true;
      if (this.filtros.edLimitada !== '') {
        const esLimitada = this.filtros.edLimitada === 'true';
        matchEdLimitada = lata.edicionLimitada === esLimitada;
      }
      const matchEdEspecial = this.filtros.edEspecial ? String(lata.edicionEspecial?.id) === this.filtros.edEspecial : true;
      const matchAnio = this.filtros.anio ? String(lata.anio) === this.filtros.anio : true;
      const matchPais = this.filtros.pais ? String(lata.pais?.id) === this.filtros.pais : true;
      const matchCaja = this.filtros.caja ? String(lata.caja?.numeroDeCaja) === this.filtros.caja : true;

      return matchMarca && matchTamano && matchSabor && matchEspecialidad && matchEdLimitada && matchEdEspecial && matchAnio && matchPais && matchCaja;
    });
  }

  limpiarFiltros() {
    this.filtros = {
      marca: '', tamano: '', sabor: '', especialidad: '',
      edLimitada: '', edEspecial: '', anio: '', pais: '', caja: ''
    };

    this.latas = [...this.latasOriginales];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
}
