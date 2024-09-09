import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {

  titulo:string = 'Estado cocheras';
  cocheras: Cochera[] = []

  actualizarCocheras(){
    this.cocheras = []
  }

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
