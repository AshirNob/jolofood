export interface Iapplyvendor{

  id:string;
  role:string;
  authtoken:string;
  bussniesname:string;
  baddress:string;
}

export class applyvendore {
  constructor(public id: string = '', public role: string = '', public authtoken: string = '', public bussniesname: string = '',public baddress:string='') {

  }
}
