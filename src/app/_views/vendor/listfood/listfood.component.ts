import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
import { Iloguser, loguser } from '../../../_shared/models/loguser';
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
import { DynamicLoaderService } from 'angular-dynamic-loader';

@Component({
  selector: 'app-listfood',
  templateUrl: './listfood.component.html',
  styleUrls: ['./listfood.component.css']
})
export class ListfoodComponent implements OnInit {
  vflist;
  log: Iloguser = new loguser();
  dtvflist: DataTables.Settings = {};
  constructor(private loader: DynamicLoaderService, private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    this.loader.show();
    this.dtvflist = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [25, 50]
    };
    if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);

      this.log.id = Number(id); this.log.authtoken = token; this.log.role = Number(role);
      this.userSerive.getbranchfood(this.log).subscribe(Response => {
        if (Response) {
          this.vflist = Response;
        } else {
          this.notifyService.showError("cant load data", "Error");
          this.router.navigate(['login']);
        }
      });
    } else {
      this.notifyService.showError("user not valid", "ERROR");
    }


    setTimeout(() => {
      this.loader.hide();
    }, 900);
  }

}
