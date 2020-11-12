export class addbranch implements Iaddbrach {
  constructor(public id: string = '', public authtoken: string = '', public role: string = '', public bname: string = '', public bnum: string = '', public foodtype: string = '', public opentime: string = '', public closetime: string = '', public image: string = '', public address: string = '', public lat: any = '', public long: any = '') { };
}
export interface Iaddbrach {
  id: string;
  authtoken: string;
  role: string;
  bname: string;
  bnum: string;
  foodtype: string;
  opentime: string;
  closetime: string;
  image: string;
  address: string;
  lat: any;
  long: any;

}

export interface Iaddfood {
  id: string;
  authtoken: string;
  role: string;
  bid: string;
  fname: string;
  ftype: string;
  image: string;
  desc: string;
  preptime: string;
  price: string;
}
export class addfood implements Iaddfood {
  constructor(public id: string = '', public authtoken: string = '', public role: string = '', public bid: string = '', public fname: string = '', public ftype: string = '', public image: string = '', public desc: string = '', public preptime: string = '', public price: string = '') { };
}
