import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataTarifasService {
  tarifas: Tarifa[] = []
  authService = inject(DataAuthService);

  constructor() { 
    this.getTarifas()
  }

  async getTarifas(){
    const res = await fetch('http://localhost:4000/tarifas',{
      headers: {
        authorization:'Bearer '+this.authService.usuario?.token
      },
    })
    if(res.status !== 200) {
      console.log("Error")
    } else {
      console.log(res)
      this.tarifas = await res.json();
    }
  }

}
