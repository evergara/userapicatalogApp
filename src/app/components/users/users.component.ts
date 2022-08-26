import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAPI } from 'src/app/model/response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  response: ResponseAPI;

  constructor(private userService: UserService) {
    this.response = {} as ResponseAPI;
  }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe((response: any) => {
      console.log(response);
      this.response = response;
    });
  }
}
