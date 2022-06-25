import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationStatus } from '../../enums/confirmation-status';
import { UserRegistrationService } from '../../services/user-registration.service';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html'
})
export class ConfirmPageComponent implements OnInit {

  confirmationStatus = ConfirmationStatus.initial;
  allConfirmationStatus = ConfirmationStatus;
  message: string = '';

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private userRegistrationService: UserRegistrationService) { 

    }

  ngOnInit(): void {
    this.confirmRegistration();
  }

  confirmRegistration(){
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.userRegistrationService.confirmRegistration(params['id']).subscribe(
        () => this.processSuccess(),
        error => this.proccessError(error)
      )
    });
  }

  processSuccess(){
    this.message = "Your account was completed successfully, let's log in to get started!"
    this.confirmationStatus = ConfirmationStatus.confirmed;
    this.spinner.hide();
  }

  proccessError(error: any){
    this.message = error;
    this.confirmationStatus = ConfirmationStatus.error;
    this.spinner.hide();
  }

}
