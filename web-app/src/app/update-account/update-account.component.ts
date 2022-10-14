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
