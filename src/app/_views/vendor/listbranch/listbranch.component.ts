import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
import { loguser } from '../../../_shared/models/loguser';
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
import { DynamicLoaderService } from 'angular-dynamic-loader';
@Component({
  selector: 'app-listbranch',
  templateUrl: './listbranch.component.html',
  styleUrls: ['./listbranch.component.css']
})
export class ListbranchComponent implements OnInit {
  vblist;req;;
  dtvblist: DataTables.Settings = {};
  constructor(private loader: DynamicLoaderService,private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    this.loader.show();
    this.dtvblist = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [25, 50]
    };

    if (sessionStorage.getItem('_id') && sessionStorage.getItem('role') && sessionStorage.getItem('t')) {
      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
      let token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      this.req = new loguser(Number(id), token, Number(role))
      this.userSerive.getbranches(this.req).subscribe(Response => {
        if (Response) {
          this.vblist = Response;
        }
        else {
          this.notifyService.showInfo('NO Reuqests Founds', 'Information');
        }
      });
    } else {
      this.notifyService.showError('Session not valid Login again', 'SESSION ERROR');
      this.router.navigate[('login')];
    }
    setTimeout(()=>{
      this.loader.hide();
    },900);
  }

}
