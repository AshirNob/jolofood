export interface IsendAccept{
id:string;
token:string;
role:string;
pid:Number;
dlat:Number;
dlng:Number;

}
export class sendAcceptModal implements IsendAccept {
    constructor(public id:string="",
    public token:string="",
    public role:string="",
    public pid:Number=0,
    public dlat:Number=0,
    public dlng :Number=0
    ){}
}