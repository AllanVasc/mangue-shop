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


  constructor(_fornecedorService: FornecedorService) {
    this.fornecedorService = _fornecedorService;
  }

  ngOnInit() {
    this.fornecedor = new Fornecedor();
  }

  registerFornecedor(){
    debugger;
    var ret = this.fornecedorService.create(this.fornecedor);
    console.log(ret);
  }

}
