import { Component, OnInit } from '@angular/core';
/** Import Necessary for form */
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
  /** Bool that decide if messages regarding success or failure of dispach will appear */
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

  /** Dispach function to define if code given is dispachable or not */
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

  /** Function to retrive suplier database intel*/
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
  /** Function to handle logouts inside the dispach page */
  logout(){
    this.fornecedorService.logOut();
  }

}
