import { Pipe, PipeTransform } from '@angular/core';
import {User} from "./user";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: User[], search = ''): User[] {
    if (!search.trim()) {
      return users
    }
    return users.filter(user => {
      return user.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}
