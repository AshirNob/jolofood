export interface Ilogin{
  email:string;
  pass:string;
}

export class loginModel implements Ilogin{
  constructor(public email:string='',public pass:string=''){}
}
