import { Picture } from './picture';
import { Coordinates } from './coordinates';

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  phone: string;
  picture: Picture;
  coordinates: Coordinates;
}
