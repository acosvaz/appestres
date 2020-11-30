import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const ROL_KEY = 'AutRol';
const ID_KEY = '1';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

   public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setRol(rol: string): void {
    window.sessionStorage.removeItem(ROL_KEY);
    window.sessionStorage.setItem(ROL_KEY, rol);
  }

  public getRol(): string {
    return sessionStorage.getItem(ROL_KEY);
  }

  public setId(id: string): void {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }

  public getId(): string {
    return sessionStorage.getItem(ID_KEY);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }

}
