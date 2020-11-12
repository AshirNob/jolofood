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
  selector: 'app-dpdashboard',
  templateUrl: './dpdashboard.component.html',
  styleUrls: ['./dpdashboard.component.css']
})
export class DpdashboardComponent implements OnInit {

  constructor(private loader: DynamicLoaderService, private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      if(enc.AES.decrypt(sessionStorage.getItem('role'),environment.password).toString(enc.enc.Utf8)==="2000"){
        this.notifyService.showSuccess("Driver partner dashboard","Driver partner");
        this.loader.show();
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

}
