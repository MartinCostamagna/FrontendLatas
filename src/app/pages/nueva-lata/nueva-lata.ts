import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
//services
import { MarcaService } from '../../serices/marca.service';
import { SaborService } from '../../serices/sabor.service';
import { TamanoService } from '../../serices/tamano.service';
import { EdicionEspecialService } from '../../serices/edicionEspecial.service';
import { EspecialidadService } from '../../serices/especialidad.service';
import { DescripcionService } from '../../serices/descripcion.service';
import { PaisService } from '../../serices/pais.service';
import { CajaService } from '../../serices/caja.service';
import { LataService } from '../../serices/lata.service';
//interfaces
import { Marca, Tamano, Sabor, Especialidad, EdicionEspecial, Descripcion, Pais, Caja } from '../../interfaces/lata.interface';

@Component({
  selector: 'app-nueva-lata',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './nueva-lata.html',
  styleUrl: './nueva-lata.css'
})
export class NuevaLata implements OnInit {
  // formulario registro lata
  formRegLata!: FormGroup;
  // Control para la entrada de texto del autocomplete de Marca
  marcaSearchControl = new FormControl('');
  // Control para la entrada de texto del autocomplete de Tamaño
  tamanoSearchControl = new FormControl('')
  // Control para la entrada de texto del autocomplete de Sabor
  saborSearchControl = new FormControl('')
  // Control para la entrada de texto del autocomplete de Especialidad
  especialidadSearchControl = new FormControl('')
  // Control para la entrada de texto del autocomplete de Edición Especial
  edicionEspecialSearchControl = new FormControl('')
  // Control para la entrada de texto del autocomplete de Descripccion
  descripcionSearchControl = new FormControl('')
  // Control para la entrada de texto del autocomplete de Años
  anioSearchControl = new FormControl('')
  // Control para la entrada de texto del autocomplete de Pais
  paisSearchControl = new FormControl('')
  // Control para la entrada de texto del autocomplete de Caja
  cajaSearchControl = new FormControl('')
  // listas para objetos
  marcas: Marca[] = [];
  filteredMarcas: Marca[] = [];
  tamanos: Tamano[] = []
  filteredTamanos: Tamano[] = []
  sabores: Sabor[] = []
  filteredSabores: Sabor[] = []
  especialidades: Especialidad[] = []
  filteredEspecialidades: Especialidad[] = []
  edicionesEspeciales: EdicionEspecial[] = []
  filteredEdicionesEspeciales: EdicionEspecial[] = []
  descripciones: Descripcion[] = []
  filteredDescripciones: Descripcion[] = []
  anios: number[] = Array.from({ length: 2100 - 1930 + 1 }, (_, i) => 1930 + i);
  filteredAnios: number[] = [...this.anios];
  paises: Pais[] = []
  filteredPaises: Pais[] = []
  cajas: Caja[] = []
  filteredCajas: Caja[] = []
  // Variables para almacenar fotos y hacer un preview
  foto1File: File | null = null;
  foto2File: File | null = null;
  foto3File: File | null = null;
  previewFoto1: string | null = null;
  previewFoto2: string | null = null;
  previewFoto3: string | null = null;
  // Listas no desplegadas
  showMarcaDropdown = false;
  showTamanoDropdown = false
  showSaborDropdown = false
  showEspecialidadDropdown = false
  showEdicionLimitadaDropdown = false
  showEdicionEspecialDropdown = false
  showDescripcionDropdown = false
  showAnioDropdown = false
  showPaisDropdown = false
  showCajaDropdown = false
  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private tamanoService: TamanoService,
    private saborService: SaborService,
    private especialidadService: EspecialidadService,
    private edicionEspecialService: EdicionEspecialService,
    private descripcionService: DescripcionService,
    private paisService: PaisService,
    private cajaService: CajaService,
    private lataService: LataService
  ) { }

  ngOnInit(): void {
    // inicializa el formulario registro de lata
    this.formRegLata = this.fb.group({
      idMarca: [null],
      idTamaño: [null],
      idSabor: [null],
      idEspecialidad: [null],
      edicionLimitada: [null],
      idEdicionEspecial: [null],
      idDescripcion: [null],
      anio: [null],
      idPais: [null],
      idCaja: [null]
    });

    //carga datos a selects
    this.cargarDatosIniciales();

    // Suscribe a los cambios del input de búsqueda de marca
    this.marcaSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'marca');
    });

    // Suscribe a los cambios del input de búsqueda de tamaño
    this.tamanoSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'tamano');
    });

    // Suscribe a los cambios del input de búsqueda de sabor
    this.saborSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'sabor');
    });

    // Suscribe a los cambios del input de búsqueda de especialidad
    this.especialidadSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'especialidad');
    });

    // Suscribe a los cambios del input de búsqueda de edición especial
    this.edicionEspecialSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'edicionEspecial');
    });

    // Suscribe a los cambios del input de búsqueda de descripción
    this.descripcionSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'descripcion');
    });

    //Suscribe a los cambios del input de búsqueda de año
    this.anioSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'anio');
    });

    // Suscribe a los cambios del input de búsqueda de país
    this.paisSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'pais');
    });

    // Suscribe a los cambios del input de búsqueda de caja
    this.cajaSearchControl.valueChanges.subscribe(value => {
      this.filterData(value, 'caja');
    });
  }

  // Contiene la lógica de las llamadas HTTP GET para cargar datos
  cargarDatosIniciales() {
    // Cargar Marcas
    this.marcaService.obtenerMarcas().subscribe({
      next: data => { this.marcas = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); this.filteredMarcas = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar marcas:', err)
    });

    // Cargar Tamaños
    this.tamanoService.obtenerTamanos().subscribe({
      next: data => { this.tamanos = data.sort((a, b) => a.volumen - b.volumen); this.filteredTamanos = data.sort((a, b) => a.volumen - b.volumen); },
      error: err => console.error('Error al cargar tamaños:', err)
    });

    // Cargar Sabores
    this.saborService.obtenerSabores().subscribe({
      next: data => { this.sabores = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); this.filteredSabores = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar sabores:', err)
    });

    // Cargar Especialidades
    this.especialidadService.obtenerEspecialidades().subscribe({
      next: data => { this.especialidades = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); this.filteredEspecialidades = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar especialidades:', err)
    });

    // Cargar Ediciones Especiales
    this.edicionEspecialService.obtenerEdicionesEspeciales().subscribe({
      next: data => { this.edicionesEspeciales = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); this.filteredEdicionesEspeciales = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar ediciones especiales:', err)
    });

    // Cargar Descripciones
    this.descripcionService.obtenerDescripciones().subscribe({
      next: data => { this.descripciones = data.sort((a, b) => a.texto.localeCompare(b.texto)); this.filteredDescripciones = data.sort((a, b) => a.texto.localeCompare(b.texto)); },
      error: err => console.error('Error al cargar descripciones:', err)
    });

    // Cargar Países
    this.paisService.obtenerPaises().subscribe({
      next: data => { this.paises = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); this.filteredPaises = data.sort((a, b) => a.nombre.localeCompare(b.nombre)); },
      error: err => console.error('Error al cargar países:', err)
    });

    // Cargar Cajas
    this.cajaService.obtenerCajas().subscribe({
      next: data => { this.cajas = data.sort((a, b) => a.numeroDeCaja - b.numeroDeCaja); this.filteredCajas = data.sort((a, b) => a.numeroDeCaja - b.numeroDeCaja); },
      error: err => console.error('Error al cargar cajas:', err)
    });
  }

  // Lógica para filtrar datos en los dropdowns
  filterData(val: string | null, tipo: string): void {
    const search = (val || '').toLowerCase();
    if (tipo === 'marca') {
      this.filteredMarcas = this.marcas.filter(m => m.nombre.toLowerCase().includes(search));
      if (!search) this.formRegLata.get('idMarca')?.setValue(null);
    }
    if (tipo === 'tamaño') {
      this.filteredTamanos = this.tamanos.filter(t => t.volumen.toString().includes(search));
      if (!search) this.formRegLata.get('idTamaño')?.setValue(null);
    }
    if (tipo === 'sabor') {
      this.filteredSabores = this.sabores.filter(s => s.nombre.toLowerCase().includes(search));
      if (!search) this.formRegLata.get('idSabor')?.setValue(null);
    }
    if (tipo === 'especialidad') {
      this.filteredEspecialidades = this.especialidades.filter(e => e.nombre.toLowerCase().includes(search));
      if (!search) this.formRegLata.get('idEspecialidad')?.setValue(null);
    }
    if (tipo === 'edicionEspecial') {
      this.filteredEdicionesEspeciales = this.edicionesEspeciales.filter(ee => ee.nombre.toLowerCase().includes(search));
      if (!search) this.formRegLata.get('idEdicionEspecial')?.setValue(null);
    }
    if (tipo === 'descripcion') {
      this.filteredDescripciones = this.descripciones.filter(d => d.texto.toLowerCase().includes(search));
      this.formRegLata.get('idDescripcion')?.setValue(null);
    }
    if (tipo === 'anio') {
      this.filteredAnios = this.anios.filter(a => a.toString().includes(search));
      if (!search) this.formRegLata.get('anio')?.setValue(null);
    }
    if (tipo === 'pais') {
      this.filteredPaises = this.paises.filter(p => p.nombre.toLowerCase().includes(search));
      if (!search) this.formRegLata.get('idPais')?.setValue(null);
    }
    if (tipo === 'caja') {
      this.filteredCajas = this.cajas.filter(c => c.numeroDeCaja.toString().includes(search));
      if (!search) this.formRegLata.get('idCaja')?.setValue(null);
    }
  }

  selectItem(item: any, tipo: string): void {
    if (tipo === 'marca') {
      this.marcaSearchControl.setValue(item.nombre, { emitEvent: false });
      this.formRegLata.get('idMarca')?.setValue(item.idMarca);
      this.showMarcaDropdown = false;
    }
    if (tipo === 'tamano') {
      this.tamanoSearchControl.setValue(item.volumen.toString(), { emitEvent: false });
      this.formRegLata.get('idTamaño')?.setValue(item.idTamano);
      this.showTamanoDropdown = false;
    }
    if (tipo === 'sabor') {
      this.saborSearchControl.setValue(item.nombre, { emitEvent: false });
      this.formRegLata.get('idSabor')?.setValue(item.idSabor);
      this.showSaborDropdown = false;
    }
    if (tipo === 'especialidad') {
      this.especialidadSearchControl.setValue(item.nombre, { emitEvent: false });
      this.formRegLata.get('idEspecialidad')?.setValue(item.idEspecialidad);
      this.showEspecialidadDropdown = false;
    }
    if (tipo === 'edicionLimitada') {
      this.formRegLata.get('edicionLimitada')?.setValue(item);
      this.showEdicionLimitadaDropdown = false;
    }
    if (tipo === 'edicionEspecial') {
      this.edicionEspecialSearchControl.setValue(item.nombre, { emitEvent: false });
      this.formRegLata.get('idEdicionEspecial')?.setValue(item.idEdicionEspecial);
      this.showEdicionEspecialDropdown = false;
    }
    if (tipo === 'descripcion') {
      this.descripcionSearchControl.setValue(item.texto, { emitEvent: false });
      this.formRegLata.get('idDescripcion')?.setValue(item.idTemplate);
      this.showDescripcionDropdown = false;
    }
    if (tipo === 'pais') {
      this.paisSearchControl.setValue(item.nombre, { emitEvent: false });
      this.formRegLata.get('idPais')?.setValue(item.idPais);
      this.showPaisDropdown = false;
    }
    if (tipo === 'anio') {
      this.anioSearchControl.setValue(item.toString(), { emitEvent: false });
      this.formRegLata.get('anio')?.setValue(item);
      this.showAnioDropdown = false;
    }
    if (tipo === 'caja') {
      this.cajaSearchControl.setValue(item.numeroDeCaja.toString(), { emitEvent: false });
      this.formRegLata.get('idCaja')?.setValue(item.idCaja);
      this.showCajaDropdown = false;
    }
  }

  onBlur(tipo: string): void {
    setTimeout(() => {
      if (tipo === 'marca') this.showMarcaDropdown = false;
      if (tipo === 'tamano') this.showTamanoDropdown = false;
      if (tipo === 'sabor') this.showSaborDropdown = false;
      if (tipo === 'especialidad') this.showEspecialidadDropdown = false;
      if (tipo === 'edicionLimitada') this.showEdicionLimitadaDropdown = false;
      if (tipo === 'edicionEspecial') this.showEdicionEspecialDropdown = false;
      if (tipo === 'descripcion') this.showDescripcionDropdown = false;
      if (tipo === 'anio') this.showAnioDropdown = false;
      if (tipo === 'pais') this.showPaisDropdown = false;
      if (tipo === 'caja') this.showCajaDropdown = false;
    }, 250);
  }

  onFileSelected(event: any, numeroFoto: number): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (numeroFoto === 1) {
        this.foto1File = file;
        this.previewFoto1 = reader.result as string;
      }
      if (numeroFoto === 2) {
        this.foto2File = file;
        this.previewFoto2 = reader.result as string;
      }
      if (numeroFoto === 3) {
        this.foto3File = file;
        this.previewFoto3 = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  removerFoto(numeroFoto: number): void {
    if (numeroFoto === 1) { this.foto1File = null; this.previewFoto1 = null; }
    if (numeroFoto === 2) { this.foto2File = null; this.previewFoto2 = null; }
    if (numeroFoto === 3) { this.foto3File = null; this.previewFoto3 = null; }
  }

  async submitLata(): Promise<void> {
    if (this.formRegLata.invalid) return;

    const nombreMarca = this.marcaSearchControl.value || '';
    if (!nombreMarca) {
      window.alert('Por favor, selecciona una Marca antes de guardar para organizar las carpetas de fotos.');
      return;
    }

    const textoEscrito = this.descripcionSearchControl.value?.trim() || '';
    let idDescripcionActual = this.formRegLata.get('idDescripcion')?.value;

    if (textoEscrito && !idDescripcionActual) {
      try {
        const nuevaDesc = await this.descripcionService.registrarDescripcion({ texto: textoEscrito }).toPromise();
        if (nuevaDesc && nuevaDesc.id) {
          idDescripcionActual = nuevaDesc.id;
          this.formRegLata.get('idDescripcion')?.setValue(idDescripcionActual);
          this.descripciones.push(nuevaDesc);
        }
      } catch (err) {
        console.error('Error al registrar la descripción:', err);
        window.alert('Error al guardar la descripción.');
        return;
      }
    }

    const formData = new FormData();

    formData.append('idMarca', this.formRegLata.value.idMarca || '');
    formData.append('idTamaño', this.formRegLata.value.idTamaño || '');
    formData.append('idSabor', this.formRegLata.value.idSabor || '');
    formData.append('idEspecialidad', this.formRegLata.value.idEspecialidad || '');
    formData.append('edicionLimitada', this.formRegLata.value.edicionLimitada);
    formData.append('idEdicionEspecial', this.formRegLata.value.idEdicionEspecial || '');
    formData.append('idDescripcion', this.formRegLata.value.idDescripcion || '');
    formData.append('idPais', this.formRegLata.value.idPais || '');
    formData.append('idCaja', this.formRegLata.value.idCaja || '');
    formData.append('anio', String(this.anioSearchControl.value || ''));

    formData.append('nombreMarca', nombreMarca);

    if (this.foto1File) formData.append('fotos', this.foto1File);
    if (this.foto2File) formData.append('fotos', this.foto2File);
    if (this.foto3File) formData.append('fotos', this.foto3File);

    this.lataService.registrarLataFormData(formData).subscribe({
      next: (res) => {
        window.alert('¡Lata e imágenes guardadas con éxito!');
        this.formRegLata.reset({ edicionLimitada: null });

        this.marcaSearchControl.setValue(''); this.tamanoSearchControl.setValue('');
        this.saborSearchControl.setValue(''); this.especialidadSearchControl.setValue('');
        this.edicionEspecialSearchControl.setValue(''); this.descripcionSearchControl.setValue('');
        this.anioSearchControl.setValue(''); this.paisSearchControl.setValue(''); this.cajaSearchControl.setValue('');

        this.foto1File = null; this.foto2File = null; this.foto3File = null;
        this.previewFoto1 = null; this.previewFoto2 = null; this.previewFoto3 = null;
      },
      error: (err) => {
        console.error('Error al guardar la lata con archivos:', err);
        window.alert('Hubo un error en el servidor al procesar el formulario.');
      }
    });
  }
}
