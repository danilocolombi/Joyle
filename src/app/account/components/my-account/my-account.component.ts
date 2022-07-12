import { Component, OnInit } from "@angular/core";
import { User } from "../../models/User";
import { UserService } from "../../services/user.service";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsernameModalComponent } from "../username-modal/username-modal.component";
import { FullNameModalComponent } from "../full-name-modal/full-name-modal.component";
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  user: User;  
  usernameModalRef: MdbModalRef<UsernameModalComponent> | null = null;
  fullNameModalRef: MdbModalRef<FullNameModalComponent> | null = null;

  constructor(private userService: UserService,
    private modalService: MdbModalService) {     
   }

  ngOnInit(): void {
    this.user = this.userService.LocalStorage.getUser();
  }

  openUsernameModal() {
    this.usernameModalRef = this.modalService.open(UsernameModalComponent, 
      { data: { username: this.user.username },
    });

    this.configureUsernameModalClose();
  }

  configureUsernameModalClose(){
    this.usernameModalRef?.onClose.subscribe((message: any) => {
      this.user = this.userService.LocalStorage.getUser();
    });
  }

  openFullNameModal() {
    this.fullNameModalRef = this.modalService.open(FullNameModalComponent, 
      { data: { fullName: this.user.fullName },
    });

    this.configureFullNameModalClose();
  }

  configureFullNameModalClose(){
    this.fullNameModalRef?.onClose.subscribe((message: any) => {
      this.user = this.userService.LocalStorage.getUser();
    });
  }
}
