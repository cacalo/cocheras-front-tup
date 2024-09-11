import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataCocherasService } from '../../services/data-cocheras.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {

  cocheras: Cochera[] = []
  esAdmin = true;

  dataCocherasService = inject(DataCocherasService)

  constructor() {
    this.cocheras = this.dataCocherasService.cocheras;
  }

  agregarCochera(){
    this.dataCocherasService.agregarCochera()
  }

  borrarFila(index:number){
    this.dataCocherasService.borrarFila(index)
  }

  deshabilitarCochera(index:number){
    this.dataCocherasService.deshabilitarCochera(index)
  }

  habilitarCochera(index:number){
    this.dataCocherasService.habilitarCochera(index)
  }

  preguntarBorrarCochera(){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

}
