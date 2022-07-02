import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { fromEvent, merge, Observable } from "rxjs";
import { DisplayMessage, GenericValidator, ValidationMessages } from "src/app/shared/utils/generic-form-validator";
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  loginForm: FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessages: DisplayMessage = {};
  authenticationRequest: AuthenticationRequest;
  loginErrorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
      this.validationMessages = {
        email:{
          required: 'The email is required'
        },
        password: {
          required: 'The password is required'
        } 
      };

      this.genericValidator = new GenericValidator(this.validationMessages);
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.configureFormValidation();
  }

  configureFormValidation(){
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formcontrol: ElementRef) => fromEvent(formcontrol.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessages = this.genericValidator.processarMensagens(this.loginForm);
    });
  }

  login(){
    if(this.loginForm.dirty && this.loginForm.valid){
      this.authenticationRequest = Object.assign({}, this.authenticationRequest, this.loginForm.value);

      this.authenticationService.authenticate(this.authenticationRequest)
        .subscribe(
          () => this.processSuccess(),
          error => this.processError(error)
        );
    }
  }

  processSuccess(){
    this.router.navigate(['/account']);
  }

  processError(error: any){
    this.loginErrorMessage = error;
  }
}
