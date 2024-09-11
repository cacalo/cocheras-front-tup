import { Injectable } from '@angular/core';
import { Cochera } from '../interfaces/cochera';

@Injectable({
  providedIn: 'root'
})
export class DataCocherasService {
  cocheras: Cochera[] = []
  
  constructor() { }

  ultimoNumero = this.cocheras[this.cocheras.length-1]?.numero || 0;
  //ultimoNumero = this.cocheras.length === 0 ? 0 : this.cocheras[this.cocheras.length-1].numero;
  agregarCochera(){
    this.cocheras.push({
      numero: this.ultimoNumero + 1,
      disponible: true,
      ingreso: '-',
      esGrande: true
    })
    this.ultimoNumero++;
  }

  borrarFila(index:number){
    this.cocheras.splice(index,1);
  }

  deshabilitarCochera(index:number){
    this.cocheras[index].disponible = false;
  }

  habilitarCochera(index:number){
    this.cocheras[index].disponible = true;
  }
}
