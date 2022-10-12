import { Component, OnInit } from '@angular/core';

import { Http} from '@angular/http';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../services/fornecedor.service';


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


  constructor(_fornecedorService: FornecedorService) {
    this.fornecedorService = _fornecedorService;
  }

  ngOnInit() {
    this.fornecedor = new Fornecedor();
    this.error = false;
    this.errorMessage = "";
  }

  registerFornecedorPF(){
    this.fornecedor.tipo = "PF";
    var teste = this.fornecedorService.validateRegistrationPF(this.fornecedor);

    if(teste['error']){
      alert(teste['error']);
      this.error = true;
      this.errorMessage = teste['error'];
    }
    else{
      alert("Parabens, vc conseguiu!");
    }
    return;

    this.fornecedorService.create(this.fornecedor)
    .then( (result) => {
        if(result){
          console.log("Deu bom!\n")
        }
    })
    .catch( (err) => {
        console.log("Deu o seguinte err: " + err);
    });
  }

}
