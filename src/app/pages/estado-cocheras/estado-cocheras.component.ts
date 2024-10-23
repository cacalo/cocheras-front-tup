import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataCocherasService } from '../../services/data-cocheras.service';
import { DataAuthService } from '../../services/data-auth.service';
import { DataTarifasService } from '../../services/data-tarifas.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {
  authService = inject(DataAuthService);
  dataTarifasService = inject(DataTarifasService);

  esAdmin = true;

  dataCocherasService = inject(DataCocherasService)


  preguntarAgregarCochera(){
    Swal.fire({
      title: "Nueva cochera?",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `Cancelar`,
      input: "text",
      inputLabel: "Nombre cochera"
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.dataCocherasService.agregarCochera(result.value)
        // await this.borrarFila(cocheraId)
        // Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  preguntarBorrarCochera(cocheraId: number){
    Swal.fire({
      title: "Borrar cochera?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
      inputValidator: (value)=> {
        console.warn('revisando value',value)
        if(!value) return 'Falta escribir un identificador a la cochera';
        for (let i = 0; i < this.dataCocherasService.cocheras.length; i++) {
          const element = this.dataCocherasService.cocheras[i];
          if(element.descripcion === value) return 'Ese identificador de cochera ya existe';
        }
        return;
      }
    }).then(async (result) => { 
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await this.dataCocherasService.borrarFila(cocheraId)
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  preguntarDeshabilitarCochera(cocheraId: number){
    Swal.fire({
      title: "Deshabilitar cochera?",
      showCancelButton: true,
      confirmButtonText: "Deshabilitar",
      denyButtonText: `Cancelar`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataCocherasService.deshabilitarCochera(cocheraId)
        // Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  preguntarHabilitarCochera(cocheraId: number){
    Swal.fire({
      title: "Hablitar cochera?",
      showCancelButton: true,
      confirmButtonText: "Habilitar",
      denyButtonText: `Cancelar`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.dataCocherasService.habilitarCochera(cocheraId)
        // Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  abrirEstacionamiento(idCochera: number) {
    const idUsuarioIngreso = "ADMIN"
    Swal.fire({
      title: "Abrir Cochera",
      html: `<input type="text" id="patente" class="swal2-input" placeholder="Ingrese patente">`,
      showCancelButton: true,
      confirmButtonText: "Abrir",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const patenteInput = document.getElementById("patente") as HTMLInputElement
        if (!patenteInput || !patenteInput.value) {
          Swal.showValidationMessage("Por favor, ingrese una patente")
          return false;
        }
        return { patente: patenteInput.value };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { patente } = result.value;
        await this.dataCocherasService.abrirEstacionamiento(patente, idUsuarioIngreso, idCochera);
      }
    })
  }

  cerrarEstacionamiento(cochera: Cochera) {
    const horario = cochera.estacionamiento?.horaIngreso;
    let fechaIngreso;
    let horasPasadas = 0; 
    let minutosPasados = 0; 
    let patente: string;
    let tarifaABuscar: string;
    let total;

    if (horario) {
        fechaIngreso = new Date(horario);

        if (fechaIngreso) {
            const fechaActual = new Date();
            const diferenciaEnMilisegundos = fechaActual.getTime() - fechaIngreso.getTime();
            horasPasadas = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
            minutosPasados = Math.floor((diferenciaEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
        }

        patente = cochera.estacionamiento?.patente!;

        const totalMinutos = horasPasadas * 60 + minutosPasados;
        if (totalMinutos <= 30) {
            tarifaABuscar = "MEDIAHORA";
        } else if (totalMinutos <= 60) {
            tarifaABuscar = "PRIMERAHORA";
        } else {
            tarifaABuscar = "VALORHORA";
        }

        total = this.dataTarifasService.tarifas.find(t => t.id === tarifaABuscar)?.valor;
    }

    const horaFormateada = fechaIngreso ? fechaIngreso.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    Swal.fire({
        html: `
            <div style="text-align: left;">
                <h4>Horario de inicio: ${horaFormateada}</h4>
                <h4>Tiempo transcurrido: ${horasPasadas} horas y ${minutosPasados} minutos</h4>
                <hr style="border: 1px solid #ccc;">
                <h2 style="margin: 20px 0 10px; text-align: center;">Total a cobrar</h2>
                <div style="background-color: #28a745; color: white; font-size: 24px; padding: 10px; border-radius: 5px; text-align: center; margin: 0 auto; display: block; width: fit-content;">
                    $${total}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button id="cobrar" class="swal2-confirm swal2-styled" style="background-color: #007bff; padding: 10px 24px;">Cobrar</button>
                    <button id="volver" class="swal2-cancel swal2-styled" style="background-color: #aaa; padding: 10px 24px;">Volver</button>
                </div>
            </div>`,
        showConfirmButton: false,
        didOpen: () => {
            const cobrarButton = document.getElementById('cobrar');
            const volverButton = document.getElementById('volver');
            
            if (cobrarButton) {
                cobrarButton.addEventListener('click', async () => {
                    const idUsuarioEgreso = "ADMIN";
                    await this.dataCocherasService.cerrarEstacionamiento(patente, idUsuarioEgreso);
                    Swal.close();
                });
            }
            
            if (volverButton) {
                volverButton.addEventListener('click', () => {
                    Swal.close();
                });
            }
        }
    });
  }
}
