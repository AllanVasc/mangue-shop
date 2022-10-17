import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../services/fornecedor.service';


@Component({
  selector: 'app-listdespacho',
  templateUrl: './listdespacho.component.html',
  styleUrls: ['./listdespacho.component.css']
})
export class ListdespachoComponent implements OnInit {
  fornecedor: Fornecedor = new Fornecedor();

  constructor(private fornecedorService: FornecedorService) { }
  /** Function to retrive suplier database intel*/
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
  /** Function to handle logouts inside the dispach page */
  logout(){
    this.fornecedorService.logOut();
  }


}
