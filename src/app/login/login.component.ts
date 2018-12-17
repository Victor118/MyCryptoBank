import { LoadingService } from './../services/loading.service';
import { Component, OnInit } from '@angular/core';
import {AccountService} from '../services/account.service';
import {AlertService} from '../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private accountService:AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService:AlertService,
    private loadingService:LoadingService) {

    
   }

  ngOnInit() {


      this.loginForm = this.formBuilder.group({
          username: ['victor118-1', Validators.required],
          password: ['P5JYxZyUTkoqzPvr7CFuv8siHd7YfGb91X8oKhTYERECcYiPPeHZ', Validators.required]
      });
    console.log("Login component !");
    // setTimeout(()=>{

     
    // },1000);
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loadingService.loading = true;
    console.log(this.loginForm.value);
    let test = this.accountService.verifyKeys(this.loginForm.value.username,this.loginForm.value.password,true).then((account)=>{
      console.log("Dans la promise :");
      console.log(account);
      this.loadingService.loading = false;
      if(account !== undefined){
        //route to app
        this.router.navigate(['/wallet']);
      }else{
        //authentication error
      }
    },(error)=>{
      this.loadingService.loading = false;
      console.log(error);
    });

}

}
