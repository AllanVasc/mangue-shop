import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Fornecedor } from '../fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  // ID to know who is the user
  private id: number = JSON.parse(localStorage.getItem('id') || '-1');
  
  private isLoggedIn = new BehaviorSubject(
    JSON.parse(localStorage.getItem('loggedIn') || 'false')
  );
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private http: Http, private router: Router) {}

  getId(){
    return JSON.parse(localStorage.getItem('id') || '-1');
  }

  getIsLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.isLoggedIn.getValue());
  }

  setIsLoggedIn(new_value: boolean){
    this.isLoggedIn.next(new_value);
    localStorage.setItem('loggedIn', new_value.toString());
  }

  setId(id: string){
    localStorage.setItem('id', id);
  }

  create(fornecedor: Fornecedor): Promise<Fornecedor> {
    return this.http.post(this.taURL + "/register",JSON.stringify(fornecedor), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 201) {return fornecedor;} else {return null;}
      })
      .catch(this.catch);
  }

  login(email: string, password: string): Promise<Fornecedor> {
    var body = { email: email, password: password };
    return this.http.post(this.taURL + "/login", JSON.stringify(body), {headers: this.headers})
      .toPromise()
      .then((res) => {
        if(res.status === 201) {
          this.setIsLoggedIn(true);
          this.setId(res.json().token);
          this.router.navigate(['/dashboard']);
          return true;
        }
        else return false;
      })
      .catch(this.catch);
  }

  logOut(){
    this.setId('-1');
    this.setIsLoggedIn(false);
    this.router.navigate(['/']);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}
