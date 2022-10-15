import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  
  updateForm: FormGroup;
  email: string = '';
  mudouSenha: boolean = false;
  notEquals: boolean = false;
  wrongFormat: boolean = false;
  pacote = {
    email: "",
    new_password: ""
  };

  constructor(private fornecedorService: FornecedorService, private route: ActivatedRoute){
    this.updateForm = new FormGroup({
      password1: new FormControl(),
      password2: new FormControl()
    });
  }

  // Atualiza Banco de dados
  update(){
    if(this.updateForm.value.password1 == this.updateForm.value.password2){
      var psw = this.updateForm.value.password1;
      if(psw.length >= 8){
        this.pacote.email = this.email;
        this.pacote.new_password = psw;
        this.fornecedorService.update_password(this.pacote)
        .then(result => {
          if(result){
            this.mudouSenha = true;
          }
          else{
            this.mudouSenha = false;
          }
        })
        .catch(error => alert(error));
      }
      else{
        this.notEquals = false;
        this.wrongFormat = true;
      }
    }
    else{
      this.notEquals = true;
      this.wrongFormat = false;
    }
  }

  // Inicialização do componente
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.email = params['email'];
      }
    );
  }
}
