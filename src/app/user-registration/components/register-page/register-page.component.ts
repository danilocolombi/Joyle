import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";
import { fromEvent, merge, Observable } from "rxjs";
import { DisplayMessage, GenericValidator, ValidationMessages } from "src/shared/utils/generic-form-validator";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent implements OnInit, AfterViewInit, OnDestroy {

  focusUsername: boolean = false;
  focusFullName: boolean = false;
  focusEmail: boolean = false;
  focusPassword: boolean = false;
  focusConfirmPassword: boolean = false;

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  registrationForm: FormGroup;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessages: DisplayMessage = {};

  constructor(private formBuilder: FormBuilder) {
    this.validationMessages = {
      username: {
        required: 'The username is required'
      },
      fulllName: {
        required: 'The full name is required'
      },
      email: {
        required: 'The email is required'
      },
      password: {
        required: 'The password is required'
      },
      confirmPassword: {
        required: 'The password confirmation is required'
      }
    };

      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.configureFormValidation();
  }

  configureFormValidation(){
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(... controlBlurs).subscribe(() => {
      this.displayMessages = this.genericValidator.processarMensagens(this.registrationForm);
    });
  }

  ngOnDestroy(){
  }

  register(){
    
  }
}
