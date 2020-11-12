import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../_shared/models/user';
import { environment } from 'src/environments/environment';

import { Ilogin } from '../_shared/models/login';
import { Iloguser, loguser } from '../_shared/models/loguser'
import { edituser } from '../_shared/models/edituser';
import { applyvendore } from '../_shared/models/applyvendor';
import { approvendor } from '../_shared/models/approvendor';
import { addbranch, addfood } from '../_shared/models/h_vendor';
import {Idp} from 'src/app/_shared/models/adp';
import {IconfirmParcel} from 'src/app/_shared/models/confrimParcel';
import {Ignp} from "src/app/_shared/models/getnearestp";
import {IsendAccept} from 'src/app/_shared/models/sendAccept';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  adduser(user: IUser) {
    return this.http.post(this.baseUrl + 'user/signup.php', user).toPromise();
  }
  login(log: Ilogin) {
    return this.http.post(this.baseUrl + 'user/login.php', log);
  }
  userdetails(loguser: Iloguser) {
    return this.http.post(this.baseUrl + 'user/userdetails.php', loguser);
  }
  edituser(edituser: edituser) {
    return this.http.post(this.baseUrl + 'user/edituser.php', edituser);
  }
  getusers(loguser: Iloguser) {
    return this.http.put(this.baseUrl + 'user/getuser.php', loguser);
  }
  applyforvendor(Gapplyvendore: applyvendore) {
    return this.http.post(this.baseUrl + 'user/applyvendore.php', Gapplyvendore);
  }
  getvendorequest(loguser: Iloguser) {
    return this.http.post(this.baseUrl + 'vendors/vendorequest.php', loguser);
  }
  aprrovendor(appvendor: approvendor) {
    return this.http.post(this.baseUrl + 'vendors/approvendor.php', appvendor);
  }
  getvendors(loguser: Iloguser) {
    return this.http.post(this.baseUrl + 'vendors/getvendors.php', loguser);

  }
  addbranch(addbranch: addbranch) {
    return this.http.post(this.baseUrl + 'vendors/addbranch.php', addbranch).subscribe();
  }
  getbranches(loguser: Iloguser) {
    return this.http.post(this.baseUrl + 'vendors/getbranches.php', loguser);
  }
  getbranchlov(loguser: Iloguser) {
    return this.http.post(this.baseUrl + 'vendors/branchlov.php', loguser);
  }
  addfood(food: addfood) {
    return this.http.post(this.baseUrl + 'vendors/addfood.php', food).subscribe();
  }
  getbranchfood(loguser: Iloguser) {
    return this.http.post(this.baseUrl + 'vendors/getbranchfood.php', loguser);
  }
  adddeal(food: addfood) {
    return this.http.post(this.baseUrl + 'vendors/adddeal.php', food).subscribe();
  }

  getbranchdeal(loguser: Iloguser) {
    return this.http.post(this.baseUrl + 'vendors/getbranchdeal.php', loguser);
  }
  getfoods(){
    return this.http.get(this.baseUrl+"user/getfoods.php");
  }
  getcartlist(list){
    return this.http.get(this.baseUrl+"m_order/get_cart_list.php?cart="+list);
  }
  adddp(data:Idp){
    return this.http.post(this.baseUrl+"driverptner/adddriverpt.php",data);

  }
  getdplist(data){
    return this.http.put(this.baseUrl+"driverptner/getdriverpts.php",data);
  }
  addriver(data){
    return this.http.post(this.baseUrl+"driver/adddriver.php",data);
  }
  getdriver(data){
    return this.http.put(this.baseUrl+"driver/getdrivers.php",data);
  }
  confirmparcel(data:IconfirmParcel){
    return this.http.put(this.baseUrl+"parcel/confirmparcel.php",data);
  }
  getNearestParcel(data:Ignp){
    return this.http.post(this.baseUrl+"parcel/checkparcelstatus.php",data);
  }
  driverAceptParcel(data:IsendAccept){
    return this.http.post(this.baseUrl+"parcel/driveraccept.php",data);
  }
}


