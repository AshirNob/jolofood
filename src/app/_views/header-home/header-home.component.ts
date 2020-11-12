import { Component, OnInit } from '@angular/core';
import { NotiService } from '../../services/noti.service'
import * as enc from 'crypto-js';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { DynamicLoaderService } from 'angular-dynamic-loader';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { Iheader, ParcelModal } from 'src/app/_shared/models/locations';
declare const L: any;
@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {
  inputs: Iheader = new ParcelModal();checklogin:boolean;
  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
if(sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')){
  this.checklogin=true;

}else{
  this.checklogin=false;
}
  }

  getmove(f: NgForm) {
    console.log(this.inputs);
    localStorage.setItem('pickup', this.inputs.pickup_location);
    localStorage.setItem('dropoff', this.inputs.drop_off_location);
    localStorage.setItem('weight', this.inputs.weight);
    if(this.inputs.pickup_location !="" && this.inputs.drop_off_location!="" && this.inputs.weight!=""){
      this.router.navigate(['confirmParcel']);
    }else{
      this.notifyService.showWarning("Please provide the proper information","Warning");
    }
   
  }
  goto(e){
    this.router.navigate([e]);
  }
}
