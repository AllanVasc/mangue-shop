import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder,
  FormControl,
  FormGroup,
  Validators, 
} from '@angular/forms';
import { Router } from '@angular/router';

import { FornecedorService } from "src/app/services/fornecedor.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  email: string = '';
  forgotForm: FormGroup;
  wrongEmail: boolean = false;
  emailSended: boolean = false;
  waitingResponde: boolean = false;

  constructor(private fornecedorService: FornecedorService, private router : Router) {
    this.forgotForm = new FormGroup({
      email: new FormControl(),
    });
  }

  sendEmail(){
    this.waitingResponde = true;
    console.log("component: " + this.forgotForm.value.email);
    this.fornecedorService.forgot_password(this.forgotForm.value.email)
    .then(result => {
      if(result){
        this.emailSended = true;
        this.wrongEmail = false;
        this.waitingResponde = false;
      }
      else{
        this.wrongEmail = true;
        this.waitingResponde = false;
      }
    })
    .catch(err => alert(err));
  }

  ngOnInit(): void {}
}
