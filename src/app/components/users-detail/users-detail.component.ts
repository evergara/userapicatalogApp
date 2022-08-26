import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ResponseAPI } from 'src/app/model/response';
import { User } from '../../model/user';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
})
export class UsersDetailComponent implements OnInit {
  uuid: string;
  mode: 'edit' | 'locked' = 'locked';
  btnSaveText: 'Save Changes' | 'Edit' = 'Edit';
  response: ResponseAPI;
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.uuid = '';
    this.user = {} as User;
    this.response = {} as ResponseAPI;
  }

  ngOnInit(): void {
    this.data();
  }

  data(): void {
    this.user = <User>(
      this.activatedRoute.snapshot.data['resolvedUseResponse'].results[0]
    );
  }
/*
  viewRouter(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.uuid = '' + params.get('uuid');
      this.getUser();
    });
  }
  getUser() {
    this.userService.fetchUser(this.uuid).subscribe((response) => {
      console.log(response);
      this.response = response;
    });
  }
*/
  changeMode(mode: 'edit' | 'locked' = 'locked'): void {
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.btnSaveText = this.btnSaveText === 'Edit' ? 'Save Changes' : 'Edit';

    if (mode === 'edit') {
      //Logic to update the user on the back end
      console.log('updating...');
    }
  }
}
