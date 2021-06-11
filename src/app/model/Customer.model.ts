import {Address} from './Address.model';

export class Customer {
  id: number;
  email: string;
  phoneNumber: string;
  address: Address = new Address();
  role: string;
  userName: string;
  gender: string;
  birthDate: Date;
  password: string;

  constructor() {
  }
}
