import { inject, Injectable } from '@angular/core';
import { DataCocherasService } from './data-cocheras.service';
import { Estacionamiento } from '../interfaces/estacionamiento';

@Injectable({
  providedIn: 'root'
})
export class DataEstacionamientosService {
  dataCocheraService = inject(DataCocherasService)
  ultimasTransacciones: Estacionamiento[] = [];

  constructor() {
    this.getUltimasTransacciones();
   }

  async getUltimasTransacciones(cantidad = 5) {
    if (!this.dataCocheraService.estacionamientos || this.dataCocheraService.estacionamientos.length === 0) {
      console.error("No hay estacionamientos disponibles");
    }

    const transaccionesFiltradas = this.dataCocheraService.estacionamientos.filter(estacionamiento => 
        estacionamiento.horaEgreso !== null && estacionamiento.horaEgreso !== undefined
    );

    const ultimasTransacciones = transaccionesFiltradas
        .sort((a, b) => new Date(b.horaIngreso.replace(" ", "T")).getTime() - new Date(a.horaIngreso.replace(" ", "T")).getTime()) // Ordenar de más reciente a más antiguo
        .slice(0, cantidad);

    this.ultimasTransacciones = ultimasTransacciones;
  }
}