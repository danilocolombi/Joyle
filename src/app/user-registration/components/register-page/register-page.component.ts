import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { ToastrService } from "ngx-toastr";
import { fromEvent, merge, Observable } from "rxjs";
import { DisplayMessage, GenericValidator, ValidationMessages } from "src/app/shared/utils/generic-form-validator";
import { RegisterNewUserRequest } from "../../models/register-new-user-request";
import { UserRegistrationService } from "../../services/user-registration.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  registrationForm: FormGroup;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessages: DisplayMessage = {};
  registerNewUserRequest: RegisterNewUserRequest;
  registrationCompleted: boolean = false;

  constructor(private fb: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private toastr: ToastrService) {
    this.validationMessages = {
      username: {
        required: 'The username is required'
      },
      fullName: {
        required: 'The full name is required'
      },
      email: {
        required: 'The email is required',
        email: 'The email is invalid'
      },
      password: {
        required: 'The password is required',
        rangeLength: 'The password should have between 6 e 30 characters',
      },
      confirmPassword: {
        required: 'The password confirmation is required',
        equalTo: 'The passwords do not match'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    let validations = [
      Validators.required,
      CustomValidators.rangeLength([6, 30]),
    ];

    let passwordValidator = new FormControl('', validations);
    validations.push(CustomValidators.equalTo(passwordValidator));    
    let confirmPasswordValidator = new FormControl('', validations);
    
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: passwordValidator,
      confirmPassword: confirmPasswordValidator
    });
  }

  ngAfterViewInit() {
    this.configureFormValidation();
  }

  configureFormValidation(){
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formcontrol: ElementRef) => fromEvent(formcontrol.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessages = this.genericValidator.processMessages(this.registrationForm);
    });
  }

  register(){
    if(this.registrationForm.dirty && this.registrationForm.valid){
      this.registerNewUserRequest = Object.assign({}, this.registerNewUserRequest, this.registrationForm.value);

      this.registerNewUserRequest.confirmationLink = "http://localhost:4200/user-registration/confirm";

      this.userRegistrationService.register(this.registerNewUserRequest)
        .subscribe(
          () => this.processSuccess(),
          error => this.processError(error)
        );
    }
  }

  processSuccess(){
    this.registrationCompleted = true;
  }

  processError(response: any){
    this.toastr.error(`There was an error handling your request: ${response}`, 'Error')
  }
}
