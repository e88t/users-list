import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users.service";
import {User} from "../shared/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  usersList: User [] = []
  searchStr: '';
  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersList = this.usersService.getUsersList()
  }


  search(value: string) {
    this.usersList = this.usersService.findUser(value)
  }

  sort(value: string) {
    this.usersList = this.usersService.sortUsers(value)
  }
}

