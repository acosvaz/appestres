import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import { Resultado } from '../models/resultado';
import { Status } from '../models/status';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class TestService {

testURL = 'http://localhost/webservice/api/'
//'http://104.197.200.77/apirest/api/';
//http://localhost/webservice/api/catalogo/find/27

  constructor(private httpClient: HttpClient) { }

  public resultado (id: string, test: Test): Observable<Resultado> {
    return this.httpClient.post<Resultado>(this.testURL + 'InsertLista/' + `test/${id}`, test, cabecera);
  }

  public historial(id: string): Observable<Resultado[]> {
    return this.httpClient.get<Resultado[]>(this.testURL + 'catalogo/' + `find/${id}`, cabecera);
  }

 public actual(id: string): Observable<Resultado[]> {
    return this.httpClient.get<Resultado[]>(this.testURL + 'catalogo/' + `index/${id}`, cabecera);
  }

 public status(id: string): Observable<any> {
    return this.httpClient.get<any>(this.testURL + 'catalogo/' + `status/${id}`, cabecera);
  }

}
