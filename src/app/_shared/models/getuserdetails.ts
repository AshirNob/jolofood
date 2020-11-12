
export interface Iuserdetail{
id:number;
firstname:string;
middlename:string;
lastname:string;
number: string;
address: string;
email: string;
profilepicture: string;
refralcode: string;
authtoken: string;
role: number;
}

export class userdetails {
id:number;
firstname:string;
middlename:string;
lastname:string;
number: string;
address: string;
email: string;
profilepicture: string;
refralcode: string;
authtoken: string;
role: number;

constructor(Response:any){
this.id=Response.id;
this.firstname=Response.firstname;
this.middlename=Response.middlename;
this.lastname=Response.lastname;
this.number=Response.number;
this.address=Response.address;
this.email=Response.email;
this.profilepicture=Response.profilepicture;
this.refralcode=Response.refralcode;
this.authtoken=Response.authtoken;
this.role=Response.role;
}

}
