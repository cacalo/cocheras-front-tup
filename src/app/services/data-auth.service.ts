import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Login, ResLogin } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {

  constructor() { }

  usuario: Usuario | undefined;

  async login(loginData:Login){
    const res = await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(loginData)
    })
    if(res.status !== 200) return;
    const resJson:ResLogin = await res.json();
    if(!resJson.token) return;
    this.usuario = {
      username : loginData.username,
      token: resJson.token,
      esAdmin : false
    }
    return resJson;
  }

}
