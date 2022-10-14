import { Component, OnInit } from '@angular/core';

import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  fornecedor: Fornecedor = new Fornecedor();
  error = false;
  errorMessage = "";

  constructor(private fornecedorService: FornecedorService) { }

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

  updateFornecedor(){
    if(this.fornecedor['tipo'] === 'PF'){
      var val = this.fornecedorService.validateRegistrationPF(this.fornecedor);
    }
    else{
      var val = this.fornecedorService.validateRegistrationPJ(this.fornecedor);
    }

    if(val['error']){
      this.error = true;
      this.errorMessage = val['error'];
      return;
    }

    this.error = false;
    this.errorMessage = "";

    this.fornecedorService.update(this.fornecedor)
    .then( (result) => {
        if(result === "Sucesso"){
          alert("Seus dados foram atualizados com sucesso!")
          window.location.reload();
        }
        else{
          this.error = true;
          this.errorMessage = result;
          alert("Houve um erro no seu cadastro: " + result);
        }
    })
    .catch( (err) => {
        alert("Deu o seguinte erro: " + err);
    });
  }

}
