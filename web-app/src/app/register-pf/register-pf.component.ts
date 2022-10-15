import { Component, OnInit } from '@angular/core';

import { Http} from '@angular/http';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register-pf',
  templateUrl: './register-pf.component.html',
  styleUrls: ['./register-pf.component.css']
})
export class RegisterPFComponent implements OnInit {

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

  registerFornecedorPF(){
    this.fornecedor.tipo = "PF";
    var val = this.fornecedorService.validateRegistrationPF(this.fornecedor);

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
