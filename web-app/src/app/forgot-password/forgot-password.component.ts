import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder,
  FormControl,
  FormGroup,
  Validators, 
} from '@angular/forms';
import { FornecedorService } from "src/app/services/fornecedor.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;

  constructor(private FornecedorService: FornecedorService) {
    this.forgotForm = new FormGroup({
      email: new FormControl(),
    });
  }

  send(){
    
  }

  ngOnInit() {
  }

}
