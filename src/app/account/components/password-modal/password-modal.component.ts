import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/utils/generic-form-validator';
import { ChangeUserPasswordRequest } from '../../models/change-user-password-request';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
})
export class PasswordModalComponent implements OnInit, AfterViewInit {

  changePasswordForm: FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessages: DisplayMessage = {};
  changeUserPasswordRequest: ChangeUserPasswordRequest;
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  
  constructor(private userService: UserService,
    private fb: FormBuilder,
    public modalRef: MdbModalRef<PasswordModalComponent>,
    private toastr: ToastrService) { 
      this.validationMessages = {
        currentPassword: {
          required: 'The password is required'
        },
        newPassword: {
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

    ngOnInit(): void {
      this.createForm();
    }
  
    ngAfterViewInit(): void {
      this.configureFormValidation();
    }
  
    createForm(){
      let validations = [
        Validators.required,
        CustomValidators.rangeLength([6, 30]),
      ];
  
      let passwordValidator = new FormControl('', validations);
      validations.push(CustomValidators.equalTo(passwordValidator));    
      let confirmPasswordValidator = new FormControl('', validations);
      
      this.changePasswordForm = this.fb.group({
        currentPassword: ['', [Validators.required]],
        newPassword: passwordValidator,
        confirmPassword: confirmPasswordValidator
      });
    }
  
    configureFormValidation(){
      let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formcontrol: ElementRef) => fromEvent(formcontrol.nativeElement, 'blur'));
  
      merge(...controlBlurs).subscribe(() => {
        this.displayMessages = this.genericValidator.processMessages(this.changePasswordForm);
      });
    }

    changePassword(){
      if(this.changePasswordForm.dirty && this.changePasswordForm.valid){
        this.changeUserPasswordRequest = Object.assign({}, this.changeUserPasswordRequest, this.changePasswordForm.value);  
        
        this.userService.changeUserPassword(this.changeUserPasswordRequest)
          .subscribe(
            () => this.processSuccess(),
            error => this.processError(error)
          );
      }
    }

    processSuccess(){
      this.modalRef.close();
      this.toastr.success('Your password was changed', 'Success!');
    }

    processError(response: any){
      this.toastr.error(`${response}`, 'Error')
    } 
}
