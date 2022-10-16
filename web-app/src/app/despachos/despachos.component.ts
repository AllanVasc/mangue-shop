import { Component, OnInit } from '@angular/core';

import { 
  FormBuilder,
  FormControl,
  FormGroup,
  Validators, 
} from '@angular/forms';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../services/fornecedor.service';


@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})

export class DespachosComponent implements OnInit {
  fornecedor: Fornecedor = new Fornecedor();
  despachoForm: FormGroup;
  codinexistente: Boolean = false;
  despachavel: Boolean = false;
  pacote = {
    email: "",
    codigo: "",
  };

  constructor(private fornecedorService: FornecedorService) { 
    this.despachoForm = new FormGroup({
      codigo: new FormControl(),
    });
  }

  despachar(): void {
    this.pacote.email = this.fornecedor.email;
    this.pacote.codigo = this.despachoForm.value.codigo;

    this.fornecedorService
      .despachar(this.pacote)
      .then((result) => {
        if (result) {
          this.despachavel = true;
        }
        else {this.codinexistente = true;}
      })
      .catch(() => (this.codinexistente = true));
  }

  ngOnInit() {
    this.fornecedorService.getFornecedor()
    .then( (res) => {
      this.fornecedor = res;
    })
    .catch ( (err) => {
      console.log("deu erro");
      console.log(err);
    })
  }

  logout(){
    this.fornecedorService.logOut();
  }

}
