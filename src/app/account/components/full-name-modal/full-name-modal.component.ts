import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/utils/generic-form-validator';
import { RenameUserRequest } from '../../models/rename-user-request';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-full-name-modal',
  templateUrl: './full-name-modal.component.html'
})
export class FullNameModalComponent implements OnInit, AfterViewInit {

  fullName: string;
  renameUserForm: FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessages: DisplayMessage = {};
  renameUserRequest: RenameUserRequest;
  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  constructor(private userService: UserService,
    private fb: FormBuilder,
    public modalRef: MdbModalRef<FullNameModalComponent>,
    private toastr: ToastrService) {
      this.validationMessages = {
        fullName: {
          required: 'The full name is required'
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
    this.renameUserForm = this.fb.group({
      fullName: [this.fullName, [Validators.required]],
    });
  }

  configureFormValidation(){
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formcontrol: ElementRef) => fromEvent(formcontrol.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessages = this.genericValidator.processarMensagens(this.renameUserForm);
    });
  }

  renameUser(){
    if(this.renameUserForm.dirty && this.renameUserForm.valid){
      this.renameUserRequest = Object.assign({}, this.renameUserRequest, this.renameUserForm.value);

      this.userService.rename(this.renameUserRequest)
        .subscribe(
          () => this.processSuccess(),
          error => this.processError(error)
        );
    }
  }

  processSuccess(){
    this.updateFullName();
    this.modalRef.close();
    this.toastr.success('Your full name was updated', 'Success!');
  }

  updateFullName(){
    let user = this.userService.LocalStorage.getUser();
    user.fullName = this.renameUserRequest.fullName;
    this.userService.LocalStorage.saveUser(user);
  }

  processError(response: any){
    this.toastr.error(`There was an error handling your request: ${response}`, 'Error')
  }
}
