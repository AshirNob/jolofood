import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
import { loguser } from '../../../_shared/models/loguser';
import { approvendor } from '../../../_shared/models/approvendor';
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-venlist',
  templateUrl: './venlist.component.html',
  styleUrls: ['./venlist.component.css']
})
export class VenlistComponent implements OnInit {
  vlist;req;
  dtvlist: DataTables.Settings = {};
  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService) { }


  ngOnInit(): void {
    this.dtvlist = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [25, 50]
    };

    if (sessionStorage.getItem('_id') && sessionStorage.getItem('role') && sessionStorage.getItem('t')) {
      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
      let token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      this.req = new loguser(Number(id), token, Number(role))
      if (role == "9999") {
        this.notifyService.showInfo('Add driver partner here', 'Driver partner');
      } else {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['login']);
        this.notifyService.showError('Session not valid', 'UnAuthoried');
      }
      this.userSerive.getvendors(this.req).subscribe(Response => {
        if (Response) {
          this.vlist = Response;
        }
        else {
          this.notifyService.showInfo('NO Reuqests Founds', 'Information');
        }
      });
    } else {
      this.notifyService.showError('Session not valid Login again', 'SESSION ERROR');
      this.router.navigate[('login')];
    }


  }

}
