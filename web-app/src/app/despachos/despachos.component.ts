import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {
  fornecedor: Fornecedor = new Fornecedor();

  constructor(private fornecedorService: FornecedorService) { }

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
