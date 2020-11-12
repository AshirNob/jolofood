export interface Ignp{
id:string;
role:string;
token:string;
lat:number;
lng:number;   
}

export class getNearestParcelModal implements Ignp{
constructor(public id:string="",
public role:string="",
public token:string="",
public lat:number=0,
public lng:number=0
){}

}