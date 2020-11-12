import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { loguser } from '../../_shared/models/loguser';
import { NotiService } from '../../services/noti.service'
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
import { userdetails } from '../../_shared/models/getuserdetails';
import { edituser } from '../../_shared/models/edituser';
import { Iapplyvendor, applyvendore } from '../../_shared/models/applyvendor';
import { Ignp, getNearestParcelModal } from "src/app/_shared/models/getnearestp";
import { parcelReqModal } from 'src/app/_shared/models/parcelReq';
import { IsendAccept, sendAcceptModal } from 'src/app/_shared/models/sendAccept';
import { IfStmt } from '@angular/compiler';
declare const L: any;
@Component({
  selector: 'app-user-dashboard-profile',
  templateUrl: './user-dashboard-profile.component.html',
  styleUrls: ['./user-dashboard-profile.component.css']
})
export class UserDashboardProfileComponent implements OnInit {
  userdetail: userdetails;
  edituser: edituser;
  firstname; middlename; lastname; role; address; email; refralcode; profilepicture; number;
  user: Boolean;
  driver: Boolean;
  Req: Ignp = new getNearestParcelModal();
  parcelReqDetails: parcelReqModal;
  vapplyvendore: Iapplyvendor = new applyvendore();
  pid: number;
  driverTrackingArea: Boolean=false;
  sendAccept: IsendAccept = new sendAcceptModal();
  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    this.driverTrackingArea = false;
    if (!navigator.geolocation) {
      this.notifyService.showInfo("Some featurs may not work Please allow location.", "Alert..!");
    }
    setInterval(() => {
      this.getNearestParcel();
    }, 10000);

    if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      let role; let authtoken; let id;
      id = sessionStorage.getItem('_id');
      id = enc.AES.decrypt(id, environment.password).toString(enc.enc.Utf8);
      authtoken = sessionStorage.getItem('t');
      authtoken = enc.AES.decrypt(authtoken, environment.password).toString(enc.enc.Utf8);
      role = sessionStorage.getItem('role');
      role = enc.AES.decrypt(role, environment.password).toString(enc.enc.Utf8);
      let log = new loguser(id, authtoken, role);

      this.userSerive.userdetails(log).subscribe(Response => {
        if (Response) {
          this.userdetail = new userdetails(Response);
          this.edituser = new edituser(Response);
          this.notifyService.showSuccess('welcome to your dashbaord', 'Hi  ' + this.userdetail.firstname);
          this.firstname = this.userdetail.firstname; this.middlename; this.userdetail.middlename; this.address = this.userdetail.address; this.role = this.userdetail.role; this.email = this.userdetail.email; this.refralcode = this.userdetail.refralcode; this.profilepicture = this.userdetail.profilepicture; this.number = this.userdetail.number;
          if (this.userdetail.role == 1000 || 1001) {
            this.user = true;
            this.driver = false;
          }
          else if (this.userdetail.role == 2222) {
            this.driver = true;
            this.user = false;


          }
        }
        else {
          this.notifyService.showInfo('cannot find user details', 'Please log in')
          this.router.navigate(['login']);
        }
      });



    }
    else {
      this.notifyService.showError('User session not valid', 'Try again |or| signup first');
      this.router.navigate(['login']);
    }



  }
  async editsubmit(editform: NgForm, edituser = this.edituser) {
    if (editform.invalid) {
      this.notifyService.showError('Invalid Details', 'ERROR');
    }
    this.userSerive.edituser(edituser);
    sessionStorage.clear();
    location.reload();
    setInterval(this.getNearestParcel, 2000);
  }

  applyvendore(applyvendoreForm: NgForm, application = this.vapplyvendore) {

    if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {

      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
      let authtoken = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      let Papplication: Iapplyvendor = new applyvendore(id, role, authtoken, application.bussniesname, application.baddress);

      this.userSerive.applyforvendor(Papplication).subscribe(Response => {
        if (Response) {
          this.notifyService.showWarning('You have successfully applied for vendore', 'Congrates' + application.bussniesname);
          document.getElementById('modalhide').click();
          this.userdetail.role = 1001;

        } else {
          this.notifyService.showError("Please try again later", "ERROR");
        }
      });

    }
    else {
      this.notifyService.showError("Please try again later", "ERROR");
    }
  }
  async getNearestParcel() {
   
      let role = Number(enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8));
      if (role === 2222) {
        setTimeout(() => {
          this.Req.id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
          this.Req.role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
          this.Req.token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
          navigator.geolocation.getCurrentPosition((position) => {
            this.Req.lat = position.coords.latitude;
            this.Req.lng = position.coords.longitude;
          });
          this.userSerive.getNearestParcel(this.Req).subscribe(Response => {
            if (Response) {
              this.parcelReqDetails = new parcelReqModal(Response);
  
              if (this.parcelReqDetails.pid) {
                this.pid = Number(this.parcelReqDetails.pid);
               if(!this.driverTrackingArea){
                document.getElementById('openReqModal').click();
               }
                
              }
            }
            else { this.notifyService.showError("Cant connect to the server", "Error"); }
          });
  
  
  
        }, 5000)
        console.log(this.Req);
      }
 
   




  }
  confirmParcel() {
    
    this.sendAccept.id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
    this.sendAccept.token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
    this.sendAccept.role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
    this.sendAccept.pid = this.pid;
    this.sendAccept.dlat = this.Req.lat;
    this.sendAccept.dlat = this.Req.lng;

    this.userSerive.driverAceptParcel(this.sendAccept).subscribe(Response => {
      if (Response) {
        this.driverTrackingArea = true;
        document.getElementById('closeParcelModal').click();
        console.log(Response);
      } else {
        this.notifyService.showInfo("Order Accepted by another driver", "Sorry..You are late");
      }
    });
  }

}
