import { Component, OnInit } from '@angular/core';

import { Http} from '@angular/http';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-register-pj',
  templateUrl: './register-pj.component.html',
  styleUrls: ['./register-pj.component.css']
})
export class RegisterPJComponent implements OnInit {

  private fornecedor: Fornecedor;
  private fornecedorService: FornecedorService;
  private error: boolean;
  private errorMessage: string;


  constructor(_fornecedorService: FornecedorService, private router: Router) {
    this.fornecedorService = _fornecedorService;
  }

  ngOnInit() {
    this.fornecedor = new Fornecedor();
    this.error = false;
    this.errorMessage = "";
  }

  registerFornecedorPJ(){
    this.fornecedor.tipo = "PJ";
    var val = this.fornecedorService.validateRegistrationPJ(this.fornecedor);

    if(val['error']){
      this.error = true;
      this.errorMessage = val['error'];
      return;
    }

    this.fornecedorService.create(this.fornecedor)
    .then( (result) => {
        if(result === "Sucesso"){
          console.log("Deu bom!\n");
          this.router.navigate(['/finish-registration']);
        }
        else{
          this.error = true;
          this.errorMessage = result;
          alert("Houve um erro no seu cadastro: " + result);
        }
    })
    .catch( (err) => {
        console.log("Deu o seguinte err: " + err);
    });
  }

}
