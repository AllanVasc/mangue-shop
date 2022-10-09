import { Component, OnInit } from '@angular/core';
import { Http} from '@angular/http';
import { Fornecedor } from '../fornecedor';


@Component({
  selector: 'app-register-pf',
  templateUrl: './register-pf.component.html',
  styleUrls: ['./register-pf.component.css']
})
export class RegisterPFComponent implements OnInit {

  server_ip = "http://localhost:3000/register";
  fornecedor: Fornecedor;

  constructor() { }

  ngOnInit() {
    this.fornecedor = new Fornecedor();
  }

  registerFornecedor(){
    debugger;

    //this.http.post()
  }

}
