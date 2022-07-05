import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute,
    private userService: UserService) {

   }

  ngOnInit(): void {
    this.user = this.userService.LocalStorage.getUser();
    console.log(this.user);
  }

}
