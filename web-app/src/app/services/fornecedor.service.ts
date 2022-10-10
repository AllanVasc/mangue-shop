import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Fornecedor } from '../fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  create(fornecedor: Fornecedor): Promise<Fornecedor> {
    return this.http.post(this.taURL + "/register",JSON.stringify(fornecedor), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 201) {return fornecedor;} else {return null;}
      })
      .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}
