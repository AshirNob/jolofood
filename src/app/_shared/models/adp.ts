export interface Idp {
  firstname: string;
  middlename: string;
  lastname: string;
  pass: string;
  number: string;
  location: string;
  profilepicture: any;
  email: string;
  authtoken: string;
  id: string;
  role: string;
}

export class DpModel implements Idp {
  constructor(public firstname: string = '',
    public middlename: string = '',
    public lastname: string = '',
    public pass: string = '',
    public number: string = '',
    public location: string = '',
    public profilepicture: any = '',
    public email: string = '',
    public id:string='',
    public authtoken:string='',
    public role:string=''


    ) { }

}
