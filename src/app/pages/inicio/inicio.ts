import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LataService } from '../../services/lata.service';
import { Lata } from '../../interfaces/lata.interface';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  lataDestacada: Lata | undefined;
  ultimasLatas: Lata[] = [];
  cantidadLatas: number = 0;
  cantidadPaises: number = 0;

  constructor(
    private lataService: LataService
  ) { }

  ngOnInit() {
    this.cargarLataRandom();
    this.cargarUltimasAdiciones();

    this.lataService.obtenerEstadisticas().subscribe({
      next: (datos) => {
        this.cantidadLatas = datos.cantidadLatas;
        this.cantidadPaises = datos.cantidadPaises;
      },
      error: (err) => console.error('Error al cargar estadísticas:', err)
    });
  }

  cargarLataRandom() {
    this.lataService.obtenerLataRandom().subscribe({
      next: (lata) => this.lataDestacada = lata,
      error: (err) => console.error('Error:', err)
    });
  }

  cargarUltimasAdiciones() {
    this.lataService.obtenerUltimasLatas().subscribe({
      next: (latas) => this.ultimasLatas = latas,
      error: (err) => console.error('Error al traer últimas:', err)
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
}
