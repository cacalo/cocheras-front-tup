import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';
import { environment } from '../../environments/environment';

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
    const res = await fetch(environment.API_URL+'tarifas',{
      headers: {
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
    })
    if(res.status !== 200) {
      console.log("Error")
    } else {
      this.tarifas = await res.json();
    }
  }

}
