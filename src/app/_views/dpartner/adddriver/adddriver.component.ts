import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
import { DriverModel, Idriver } from 'src/app/_shared/models/driver';
import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { DynamicLoaderService } from 'angular-dynamic-loader';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-adddriver',
  templateUrl: './adddriver.component.html',
  styleUrls: ['./adddriver.component.css']
})
export class AdddriverComponent implements OnInit {
  Driver: Idriver = new DriverModel();
  constructor(private loader: DynamicLoaderService, private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {

    if(sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      if(enc.AES.decrypt(sessionStorage.getItem('role'),environment.password).toString(enc.enc.Utf8)==="2000"){
        this.notifyService.showSuccess("Add driver Here","Add Driver");

      }else{
        sessionStorage.clear();
        this.notifyService.showError("session not valid","Error");
        this.router.navigate(['login']);
      }

    } else {
      sessionStorage.clear();
      this.notifyService.showError('Please login ', 'Session not found');
      this.router.navigate(['login']);

    }
    setTimeout(() => {
      this.loader.hide();
    }, 900);
  }
  addDriver(f: NgForm) {
    if (f.invalid) {
      this.notifyService.showError("Please fill the form properly", "Validation Error")
    } else {
      this.Driver.id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      this.Driver.authtoken = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      this.Driver.role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
      this.Driver.pass=Md5.hashStr(this.Driver.pass).toString();
      this.userSerive.addriver(this.Driver).subscribe(Response=>{
        if(Response){
          this.notifyService.showSuccess("Driver added","Success");
          this.Driver.V_paper=null;
          this.Driver.email=null;
          this.Driver.firstname=null;
          this.Driver.middlename=null;
          this.Driver.lastname=null;
          this.Driver.location=null;
          this.Driver.D_license=null;
          this.Driver.V_no=null;
          this.Driver.profilepicture=null;
          this.Driver.pass=null;
          this.Driver.D_cnic=null;

        }else{

        }
      });

    }
  }
  driverimg(event) {
    var file = event.target.files[0];
    var basestring;
    if (file) {
      let me = this;
      var reader = new FileReader();
      reader.onload = function (readerEvt) {
        var binaryString: any = readerEvt.target.result;
        basestring = (window.btoa(binaryString));
        me.Driver.profilepicture = basestring;
      };
      reader.readAsBinaryString(file);
    }
  }
  V_paper(event) {
    var file = event.target.files[0];
    var basestring;
    if (file) {
      let me = this;
      var reader = new FileReader();
      reader.onload = function (readerEvt) {
        var binaryString: any = readerEvt.target.result;
        basestring = (window.btoa(binaryString));
        me.Driver.V_paper = basestring;
      };
      reader.readAsBinaryString(file);
    }
  }
  D_license(event) {
    var file = event.target.files[0];
    var basestring;
    if (file) {
      let me = this;
      var reader = new FileReader();
      reader.onload = function (readerEvt) {
        var binaryString: any = readerEvt.target.result;
        basestring = (window.btoa(binaryString));
        me.Driver.D_license = basestring;
      };
      reader.readAsBinaryString(file);
    }
  }
  D_cnic(event) {
    var file = event.target.files[0];
    var basestring;
    if (file) {
      let me = this;
      var reader = new FileReader();
      reader.onload = function (readerEvt) {
        var binaryString: any = readerEvt.target.result;
        basestring = (window.btoa(binaryString));
        me.Driver.D_cnic = basestring;
      };
      reader.readAsBinaryString(file);
    }
  }

  V_img(event) {
    var file = event.target.files[0];
    var basestring;
    if (file) {
      let me = this;
      var reader = new FileReader();
      reader.onload = function (readerEvt) {
        var binaryString: any = readerEvt.target.result;
        basestring = (window.btoa(binaryString));
        me.Driver.V_img = basestring;
      };
      reader.readAsBinaryString(file);
    }
  }
}
