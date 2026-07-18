import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
//services
import { AuthService } from '../../services/auth.service';
import { LataNoTengoService } from '../../services/lata-no-tengo.service';
import { LataNoTengo } from '../../interfaces/lata-no-tengo.interface';

@Component({
  selector: 'app-lata-no-tengo',
  imports: [FormsModule],
  templateUrl: './lata-no-tengo.html',
  styleUrl: './lata-no-tengo.css'
})
export class LataNoTengoDetalle implements OnInit {
  // Variable para almacenar lata seleccionada
  lataSeleccionada: LataNoTengo | undefined;
  estaLogueado: boolean = false;
  modoEdicion: boolean = false;
  lataEditada: any = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lataNoTengoService: LataNoTengoService,
    private authService: AuthService
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
        this.lataNoTengoService.obtenerLataNoTengoPorId(idLata).subscribe(lata => {
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
    return `${urlBackend}/static/lata-no-tengo/${rutaCodificada}`;
  }

  editarLata() {
    this.modoEdicion = true;

    if (this.lataSeleccionada) {
      this.lataEditada = {
        id: this.lataSeleccionada.id,
        nombre: this.lataSeleccionada.nombre,
        estado: this.lataSeleccionada.estado,
        foto1: this.lataSeleccionada.foto1
      };
    }
  }

  eliminarLata() {
    if (!this.lataSeleccionada || !this.lataSeleccionada.id) return;

    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar la lata "${this.lataSeleccionada.nombre}"? Esta acción no se puede deshacer.`
    );

    if (confirmar) {
      this.lataNoTengoService.eliminarLataNoTengo(this.lataSeleccionada.id).subscribe({
        next: () => {
          window.alert('¡Lata eliminada con éxito!');
          this.router.navigate(['/ListaLatasNoTengo']);
        },
        error: (err) => {
          console.error('Error al eliminar la lata:', err);
          window.alert('Hubo un error en el servidor al intentar eliminar la lata.');
        }
      });
    }
  }

  guardarLata() {
    if (!this.lataEditada.id) return;

    if (!this.lataEditada.nombre || !this.lataEditada.estado) {
      window.alert('Por favor, completa todos los campos antes de guardar.');
      return;
    }

    const payload = {
      nombre: this.lataEditada.nombre,
      estado: this.lataEditada.estado
    };

    this.lataNoTengoService.actualizarLataNoTengo(this.lataEditada.id, payload).subscribe({
      next: (lataActualizada) => {
        window.alert('¡Lata actualizada con éxito!');

        this.lataSeleccionada = lataActualizada;
        this.modoEdicion = false;
      },
      error: (err) => {
        console.error('Error al actualizar la lata:', err);
        window.alert('Hubo un error en el servidor al intentar guardar los cambios.');
      }
    });
  }

  cancelar() {
    this.modoEdicion = false;
    this.lataEditada = { nombre: '', estado: '' };
  }
}
