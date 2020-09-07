import { Component, OnInit } from '@angular/core';
import {UsersService} from "../users.service";
import {User} from "../shared/user";
import {MatListOption} from "@angular/material/list";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  form: FormGroup;
  usersList: User [] = [];
  username: string;
  name: string;
  role: string;
  searchStr: '';
  selectedList: User[];
  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      role: new FormControl(null, [Validators.required])
    });
    this.usersList = this.usersService.getUsersList()
  }


  search(value: string) {
    this.usersList = this.usersService.findUser(value)
  }

  sort(value: string) {
    this.usersList = this.usersService.sortUsers(value)
  }

  addUser() {
    if (this.form.valid) {
      this.usersService.addUser({
        id: this.usersList.length + 2,
        name: this.form.value.name,
        username: this.form.value.username,
        email: "",
        role: this.form.value.role,
        phone: "",
        website: ""
      });
      this.usersList = this.usersService.getUsersList()
    }
  }

  selectItem(users: MatListOption[]) {
    this.selectedList = [];
    users.forEach(element => {
      this.selectedList.push(element.value);
    })
  }
  deleteUsers() {
    this.usersService.deleteUsers(this.selectedList)
    this.usersList = this.usersService.getUsersList()
  }
}

