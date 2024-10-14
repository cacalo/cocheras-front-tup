import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataCocherasService } from '../../services/data-cocheras.service';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {
  authService = inject(DataAuthService);

  esAdmin = true;

  dataCocherasService = inject(DataCocherasService)


  async agregarCochera(){
    await this.dataCocherasService.agregarCochera()
  }

  async borrarFila(index:number){
    await this.dataCocherasService.borrarFila(index)
  }

  deshabilitarCochera(index:number){
    this.dataCocherasService.deshabilitarCochera(index)
  }

  habilitarCochera(index:number){
    this.dataCocherasService.habilitarCochera(index)
  }

  preguntarBorrarCochera(cocheraId: number){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await this.borrarFila(cocheraId)
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }


}
