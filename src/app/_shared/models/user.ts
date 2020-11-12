export interface IUser {
  firstname: string;
  middlename: string;
  lastname: string;
  pass: string;
  number: string;
  location: string;
  profilepicture: any;
  email: string;
}

export class UserModel implements IUser {
  constructor(public firstname: string = '',
    public middlename: string = '',
    public lastname: string = '',
    public pass: string = '',
    public number: string = '',
    public location: string = '',
    public profilepicture: any = '',
    public email: string = '') { }

}
