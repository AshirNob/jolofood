export interface Iauthuser {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  number: string;
  address: string;
  email: string;
  profilepicture: string;
  refralcode: string;
  authtoken: string;
  role: string;


}
export class authuserModel {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  number: string;
  address: string;
  email: string;
  profilepicture: string;
  refralcode: string;
  authtoken: string;
  role: string;

  constructor(userResponse:any) {
    this.id = userResponse.id;
    this.firstname = userResponse.firstname;
    this.middlename = userResponse.middlename;
    this.lastname = userResponse.lastname;
    this.number = userResponse.number;
    this.address = userResponse.address;
    this.email = userResponse.email;
    this.profilepicture = userResponse.profilepicture;
    this.refralcode = userResponse.refralcode;
    this.authtoken = userResponse.authtoken;
    this.role = userResponse.role;




  }

}


