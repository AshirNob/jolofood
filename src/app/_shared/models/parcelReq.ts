

export class parcelReqModal{
pickup:string;
dropoff:string;
weight:string;
total_distance:string;
note:string;
pid:string;
constructor(Response:any){
    this.pickup=Response.pickup;
    this.dropoff=Response.dropoff;
    this.weight=Response.weight;
    this.total_distance=Response.total_distance;
    this.note=Response.note;
    this.pid=Response.pid;
}
}