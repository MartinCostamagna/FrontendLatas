import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LataNoTengoService } from '../../services/lata-no-tengo.service';
import { LataNoTengo } from '../../interfaces/lata-no-tengo.interface';

@Component({
  selector: 'app-lista-lata-no-tengo',
  imports: [FormsModule, RouterLink],
  templateUrl: './lista-lata-no-tengo.html',
  styleUrl: './lista-lata-no-tengo.css'
})
export class ListaLataNoTengo implements OnInit {
  latasNoTengoOriginales: LataNoTengo[] = [];
  latasNoTengo: LataNoTengo[] = [];
  filtro = { estado: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lataNoTengoService: LataNoTengoService
  ) { }

  ngOnInit(): void {
    this.lataNoTengoService.obtenerLatasNoTengo().subscribe({
      next: (data) => {
        const latasOrdenadas = data.sort((a, b) => {
          const nombreA = a.nombre?.toLowerCase() || '';
          const nombreB = b.nombre?.toLowerCase() || '';
          return nombreA.localeCompare(nombreB);
        });

        this.latasNoTengo = latasOrdenadas;
        this.latasNoTengoOriginales = [...latasOrdenadas];
      },
      error: err => console.error('Error al cargar latas que no tengo:', err)
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

  filtrarLatas(): void {
    if (!this.filtro.estado) {
      this.latasNoTengo = [...this.latasNoTengoOriginales];
    } else {
      this.latasNoTengo = this.latasNoTengoOriginales.filter(lata =>
        lata.estado === this.filtro.estado
      );
    }
  }

  limpiarFiltros() {
    this.filtro = { estado: '' };

    this.latasNoTengo = [...this.latasNoTengoOriginales];

    this.router.navigate([], {
      relativeTo: this.route,
    });
  }

}
