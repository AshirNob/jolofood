export interface Idriver {
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
  V_paper:string;
  D_license:string;
  D_cnic:string;
  V_no:string;
  V_img:string;

}

export class DriverModel implements Idriver {
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
    public V_paper:string='',
    public D_license:string='',
    public D_cnic:string='',
    public V_no:string='',
    public V_img:string='',
    public role:string=''


    ) { }

}
