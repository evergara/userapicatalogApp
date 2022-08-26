import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseAPI } from 'src/app/model/response';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<ResponseAPI> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): Observable<ResponseAPI> {
    let uuid = '' + route.paramMap.get('uuid');
    return this.userService.fetchUser(uuid);
  }
}
