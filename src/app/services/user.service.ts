import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseAPI } from '../model/response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  fetchUsers(size: number = 10): Observable<ResponseAPI> {
    return this.http
      .get<ResponseAPI>(`${this.apiURL}/?results=${size}`)
      .pipe(map((response) => this.mapperResponse(response)));
  }

  fetchUser(uuid: string): Observable<ResponseAPI> {
    return this.http
      .get<ResponseAPI>(`${this.apiURL}/?uuid=${uuid}`)
      .pipe(map((response) => this.mapperResponse(response)));
  }

  private mapperResponse(response: ResponseAPI): ResponseAPI {
    return {
      info: { ...response.info },
      results: response.results.map(
        (user: any) =>
          <User>{
            uuid: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            userName: user.login.username,
            gender: user.gender,
            address: `${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.country}`,
            dateOfBirth: user.dob.date,
            phone: user.phone,
            picture: user.picture,
            coordinates: {
              latitude: user.location.coordinates.latitude,
              longitude: user.location.coordinates.longitude,
            },
          }
      ),
    };
  }
}
