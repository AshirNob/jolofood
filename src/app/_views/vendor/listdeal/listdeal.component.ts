import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
import { Iloguser, loguser } from '../../../_shared/models/loguser';
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
import { DynamicLoaderService } from 'angular-dynamic-loader';
@Component({
  selector: 'app-listdeal',
  templateUrl: './listdeal.component.html',
  styleUrls: ['./listdeal.component.css']
})
export class ListdealComponent implements OnInit {
vdlist;
log: Iloguser = new loguser();
dtvdlist: DataTables.Settings = {};
  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService, private loader: DynamicLoaderService) { }

  ngOnInit(): void {
this.loader.show();
    this.dtvdlist={
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [25, 50]
    };

    if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);

      this.log.id = Number(id); this.log.authtoken = token; this.log.role = Number(role);
      this.userSerive.getbranchdeal(this.log).subscribe(Response => {
        if (Response) {
          this.vdlist = Response;
        } else {
          this.notifyService.showError("cant load data", "Error");
          this.router.navigate(['login']);
        }
      });
    } else {
      this.notifyService.showError("user not valid", "ERROR");
    }



    setTimeout(()=>{
      this.loader.hide();
    },900);
  }

}
