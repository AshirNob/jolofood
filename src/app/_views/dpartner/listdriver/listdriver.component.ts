import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import {loguser ,Iloguser} from 'src/app/_shared/models/loguser';
import { DynamicLoaderService } from 'angular-dynamic-loader';

@Component({
  selector: 'app-listdriver',
  templateUrl: './listdriver.component.html',
  styleUrls: ['./listdriver.component.css']
})
export class ListdriverComponent implements OnInit {
listDrivers;
loguser:Iloguser=new loguser();
dtdlist: DataTables.Settings = {};
  constructor(private loader: DynamicLoaderService, private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    this.dtdlist = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [25, 50]
    };
    if(sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      if(enc.AES.decrypt(sessionStorage.getItem('role'),environment.password).toString(enc.enc.Utf8)==="2000"){
        this.notifyService.showSuccess("List of your drivers","List of driver");
        this.loguser.id=Number(enc.AES.decrypt(sessionStorage.getItem('_id'),environment.password).toString(enc.enc.Utf8));
        this.loguser.authtoken=enc.AES.decrypt(sessionStorage.getItem('t'),environment.password).toString(enc.enc.Utf8);
        this.loguser.role=Number(enc.AES.decrypt(sessionStorage.getItem('role'),environment.password).toString(enc.enc.Utf8));
        this.loader.show();
        this.userSerive.getdriver(this.loguser).subscribe(Response=>{
          if(Response){
            this.listDrivers=Response;
          }else{
            this.notifyService.showError("Cant get data","No Data or server error");
          }
        });

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
