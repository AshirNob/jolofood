export interface IconfirmParcel{
pickup_location:string;
drop_off_location:string;
weight:string;
note:string;
pickuplat:string;
pickuplng:string;
drop_off_lat:string;
drop_off_lng:string;
total_distance:string;
time:string;
reciverName:string;
reciverPhone:string;
id:string;
role:string;
token:string;


}

export class ConfirmParcelModal implements IconfirmParcel{
constructor(public pickup_location="",
public drop_off_location="",
public weight="",
public note="",
public pickuplat="",
public pickuplng="",
public drop_off_lat="",
public drop_off_lng="",
public total_distance="",
public reciverName="",
public reciverPhone="",
public time="",
public id="",
public token ="",
public role=""
){}
}
