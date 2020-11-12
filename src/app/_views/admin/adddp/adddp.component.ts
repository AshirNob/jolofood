import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
import { DpModel, Idp } from 'src/app/_shared/models/adp';
import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { DynamicLoaderService } from 'angular-dynamic-loader';

@Component({
  selector: 'app-adddp',
  templateUrl: './adddp.component.html',
  styleUrls: ['./adddp.component.css']
})
export class AdddpComponent implements OnInit {
  user: Idp = new DpModel();
  constructor(private loader: DynamicLoaderService, private userSerive: UserService, private router: Router, private notifyService: NotiService) { }
  ngOnInit(): void {
    this.loader.show();
    if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      this.user.id = enc.AES.decrypt((sessionStorage.getItem('_id')), environment.password).toString(enc.enc.Utf8);
      this.user.authtoken = enc.AES.decrypt((sessionStorage.getItem('t')), environment.password).toString(enc.enc.Utf8);
      this.user.role = enc.AES.decrypt((sessionStorage.getItem('role')), environment.password).toString(enc.enc.Utf8);
      if (this.user.role == "9999") {
        this.notifyService.showInfo('Add driver partner here', 'Driver partner');
      } else {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['login']);
        this.notifyService.showError('Session not valid', 'UnAuthoried');
      }
    } else {
      this.notifyService.showError('Please login ', 'Session not found');
      this.router.navigate(['login']);
    }
    setTimeout(() => {
      this.loader.hide();
    }, 900);
  }
  adddp(f: NgForm) {
    if (f.invalid) {
      this.notifyService.showWarning('Fill the form properly OR validate properly', 'Invalid Form')
    } else {
      this.user.pass = Md5.hashStr(this.user.pass).toString();
      this.userSerive.adddp(this.user).subscribe(Response => {
        if (Response) {
          this.notifyService.showSuccess('Driver partner succesfully added', 'Success !');
          this.user.id = null;
          this.user.authtoken = null;
          this.user.role = null;
          this.user.firstname = null;
          this.user.middlename = null;
          this.user.lastname = null;
          this.user.email = null;
          this.user.pass = null;
          this.user.location = null;
          this.user.profilepicture = null;
          this.user.number = null;
        }
        else {
          this.notifyService.showError('Invalid form or email already registerd', 'Error');
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
        me.user.profilepicture = basestring;
      };
      reader.readAsBinaryString(file);
    }
  }
}
