

export interface Iloguser{
id:number;
authtoken:string;
role:number;
}
export class loguser implements Iloguser{
constructor(public id:number=0,public authtoken:string='',public role:number=0){}
}
