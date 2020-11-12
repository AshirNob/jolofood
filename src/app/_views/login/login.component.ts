import { Component, OnInit } from '@angular/core';
import { Ilogin, loginModel } from 'src/app/_shared/models/login';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { authuserModel } from 'src/app/_shared/models/authuser';
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
import { NotiService } from '../../services/noti.service';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Ilogin = new loginModel();
  resuser: any;

  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  onlogin(form: NgForm, login = this.login) {
    let pass = Md5.hashStr(login.pass).toString();
    let lo: Ilogin = new loginModel(login.email, pass);
    this.userSerive.login(lo).subscribe(Response => {
      if (Response) {
        this.resuser = new authuserModel(Response);

        let id = this.resuser.id;
        let role = this.resuser.role;
        let authtoken = this.resuser.authtoken;
        if (this.resuser.role === '1000' || this.resuser.role === '1001') {
          console.log(this.resuser);
          id = enc.AES.encrypt(id, environment.password).toString();
          role = enc.AES.encrypt(role, environment.password).toString();
          authtoken = enc.AES.encrypt(authtoken, environment.password).toString();
          sessionStorage.setItem('_id', id);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('t', authtoken);
          this.router.navigate(['userdashboard']);
        } else if (this.resuser.role === '2222') {
          id = enc.AES.encrypt(id, environment.password).toString();
          role = enc.AES.encrypt(role, environment.password).toString();
          authtoken = enc.AES.encrypt(authtoken, environment.password).toString();
          sessionStorage.setItem('_id', id);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('t', authtoken);
          this.router.navigate(['userdashboard']);
        }
        else if (this.resuser.role === '9999') {
          id = enc.AES.encrypt(id, environment.password).toString();
          role = enc.AES.encrypt(role, environment.password).toString();
          authtoken = enc.AES.encrypt(authtoken, environment.password).toString();
          sessionStorage.setItem('_id', id);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('t', authtoken);
          this.router.navigate(['admin']);
        } else if (this.resuser.role === '1111') {
          id = enc.AES.encrypt(id, environment.password).toString();
          role = enc.AES.encrypt(role, environment.password).toString();
          authtoken = enc.AES.encrypt(authtoken, environment.password).toString();
          sessionStorage.setItem('_id', id);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('t', authtoken);
          this.router.navigate(['vdashboard']);
        }
        else if (this.resuser.role === '2000') {
          id = enc.AES.encrypt(id, environment.password).toString();
          role = enc.AES.encrypt(role, environment.password).toString();
          authtoken = enc.AES.encrypt(authtoken, environment.password).toString();
          sessionStorage.setItem('_id', id);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('t', authtoken);
          this.router.navigate(['dpdasboard']);
        }
        else {
          this.notifyService.showError("User Not Found", "Please signup first")
        }
      }
    });
  }
}
