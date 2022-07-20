import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-inactivate-modal',
  templateUrl: './inactivate-modal.component.html'
})
export class InactivateModalComponent implements OnInit {

  constructor(private userService: UserService,
    public modalRef: MdbModalRef<InactivateModalComponent>,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  inactivateUser(){
      this.userService.inactivate()
        .subscribe(
          () => this.processSuccess(),
          error => this.processError(error)
        );
  }

  processSuccess(){
    this.modalRef.close();
    this.toastr.success('Your account was inactivated', 'Success!')
      .onHidden.subscribe(
        () => this.router.navigate(['/login'])
      );
  }

  processError(response: any){
    this.toastr.error(`${response}`, 'Error')
  }
}