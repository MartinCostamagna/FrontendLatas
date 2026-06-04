import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lata } from '../../interfaces/lata.interface';
import { LataService } from '../../services/lata.service';

// Interfaz para darle forma a la tabla
interface AnioConteo {
  anio: number | string;
  cantidad: number;
}

@Component({
  selector: 'app-anios',
  imports: [CommonModule],
  templateUrl: './anios.html',
  styleUrl: './anios.css'
})
export class Anios implements OnInit {
  objetos: AnioConteo[] = [];

  constructor(private lataService: LataService) { }

  ngOnInit(): void {
    this.cargarYContarAnios();
  }

  cargarYContarAnios(): void {
    this.lataService.obtenerLatas().subscribe((dataLatas: Lata[]) => {
      const conteo: { [key: string]: number } = {};

      dataLatas.forEach(lata => {
        const anioKey = lata.anio;
        if (conteo[anioKey]) {
          conteo[anioKey]++;
        } else {
          conteo[anioKey] = 1;
        }
      });

      this.objetos = Object.keys(conteo).map(key => ({
        anio: key === 'Sin año' ? key : Number(key),
        cantidad: conteo[key]
      }));

      this.ordenarPorAnio();
    });
  }

  ordenarPorAnio(): void {
    this.objetos.sort((a, b) => {
      return (a.anio as number) - (b.anio as number);
    });
  }

  ordenarPorCantidad(): void {
    this.objetos.sort((a, b) => b.cantidad - a.cantidad);
  }
}