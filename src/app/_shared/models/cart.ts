export class cart{
id:string;
name:string;
image:string;
price:string;
description:string;

constructor(Response:any){
this.id=Response.id;
this.name=Response.name;
this.image=Response.image;
this.price=Response.price;
this.description=Response.description;
}


}
