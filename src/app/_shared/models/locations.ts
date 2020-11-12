export interface Iheader{
pickup_location:string;
drop_off_location:string;
weight:string;
}
export class ParcelModal{

  constructor(public pickup_location="",public drop_off_location="",public weight=""){}

}
