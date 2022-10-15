import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  fornecedor: Fornecedor = new Fornecedor();
  email: string;
  senha: string;

  constructor(private fornecedorService: FornecedorService, private router: Router) { }

  ngOnInit() {
    this.fornecedorService.getFornecedor()
    .then( (res) => {
      this.fornecedor = res;
    })
    .catch ( (err) => {
      console.log("deu erro");
      console.log(err);
    });
  }

  deleteAccount(){
    var deleteObject = {email: this.email, senha: this.senha, id: this.fornecedor['id']};
    console.log(deleteObject);
    this.fornecedorService.delete(deleteObject)
    .then( (result) =>{
      if(result == "Sucesso"){
        alert("Sua conta foi deletada com sucesso. Estamos tristes de te ver partir. Esperamos ver você de volta!");
        this.fornecedorService.logOut();
      }
      else{
        console.log(result);
        alert("Houve um erro na sua requisição: " + result);
      }
    })
    .catch((err) =>{
      alert("Houve um erro na sua requisição: " + err);
    });
    ;
  }

  logout(){
    this.fornecedorService.logOut();
  }
}
