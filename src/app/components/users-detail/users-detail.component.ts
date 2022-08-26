import { CrossOrigin } from './../../../../node_modules/@types/leaflet/index.d';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';

import * as Leaflet from 'leaflet';

import { ResponseAPI } from 'src/app/model/response';
import { User } from '../../model/user';
import { Coordinates } from '../../model/coordinates';

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
  marker = new Leaflet.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0/images/marker-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [41, 41],
  });

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
    this.loadMap(this.user.coordinates);
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

  private loadMap(coordinates: Coordinates): void {
    var map = Leaflet.map('map', {
      center: [Number(coordinates.latitude), Number(coordinates.longitude)],
      zoom: 10,
    });
    const mainLayer = Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom: 30,
        crossOrigin: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    mainLayer.addTo(map);
    const marker = Leaflet.marker(
      [Number(coordinates.latitude), Number(coordinates.longitude)],
      { icon: this.marker }
    );
    marker
      .addTo(map)
      .bindPopup(`${this.user.firstName} 's Location`)
      .openPopup();
  }
}
