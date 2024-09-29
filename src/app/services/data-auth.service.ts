import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Login, ResLogin } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {

  constructor() { }

  usuario: Usuario | undefined;

  async login(loginData: Login) {
    const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    if (res.status !== 200) return;

    const resJson: ResLogin = await res.json();

    if (!resJson.token) return;

    this.usuario = {
        username: loginData.username,
        token: resJson.token,
        esAdmin: false
    };

    const userDetailsRes = await fetch(`http://localhost:4000/usuarios/${encodeURIComponent(loginData.username)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${resJson.token}`,
            'Content-Type': 'application/json'
        }
    });

    if (userDetailsRes.status !== 200) return;

    const userDetailsResJson = await userDetailsRes.json();

    this.usuario.esAdmin = userDetailsResJson.esAdmin;

    return userDetailsRes;
  }
}
