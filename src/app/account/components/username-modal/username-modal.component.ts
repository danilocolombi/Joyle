import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/utils/generic-form-validator';
import { ChangeUsernameRequest } from '../../models/change-username-request';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-username-modal',
  templateUrl: './username-modal.component.html'
})
export class UsernameModalComponent implements OnInit, AfterViewInit {

  username: string;
  changeUsernameForm: FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessages: DisplayMessage = {};
  changeUsernameRequest: ChangeUsernameRequest;
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  
  constructor(private userService: UserService,
    private fb: FormBuilder,
    public modalRef: MdbModalRef<UsernameModalComponent>,
    private toastr: ToastrService) {
      this.validationMessages = {
        username: {
          required: 'The username is required'
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
    this.changeUsernameForm = this.fb.group({
      username: [this.username, [Validators.required]],
    });
  }

  configureFormValidation(){
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formcontrol: ElementRef) => fromEvent(formcontrol.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessages = this.genericValidator.processarMensagens(this.changeUsernameForm);
    });
  }

  changeUsername(){
    if(this.changeUsernameForm.dirty && this.changeUsernameForm.valid){
      this.changeUsernameRequest = Object.assign({}, this.changeUsernameRequest, this.changeUsernameForm.value);

      this.userService.changeUsername(this.changeUsernameRequest)
        .subscribe(
          () => this.processSuccess(),
          error => this.processError(error)
        );
    }
    else{
      console.log("can't change");
    }
  }

  processSuccess(){
    this.updateUsername();
    this.modalRef.close();
    this.toastr.success('Your username was changed', 'Success!');
  }

  updateUsername(){
    let user = this.userService.LocalStorage.getUser();
    user.username = this.changeUsernameRequest.username;
    this.userService.LocalStorage.saveUser(user);
  }

  processError(response: any){
    this.toastr.error(`There was an error handling your request: ${response}`, 'Error')
  }
}
