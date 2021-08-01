import { Authority } from './authority';
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  points: number;
  hoursFlown: number;
  pireps: number;
  averageLandingRate: number;
  currentLocation: string;
  birthDate: Date;
  username: string;
  authorities: Authority[];

}
