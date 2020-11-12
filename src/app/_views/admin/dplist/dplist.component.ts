import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
import { loguser } from '../../../_shared/models/loguser';
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dplist',
  templateUrl: './dplist.component.html',
  styleUrls: ['./dplist.component.css']
})
export class DplistComponent implements OnInit {
  dplist;req;
  dtdplist: DataTables.Settings = {};
  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    this.dtdplist = {
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
      this.userSerive.getdplist(this.req).subscribe(Response => {
        if (Response) {
          this.dplist = Response;
        }
        else {
          this.notifyService.showInfo('NO data Founds', 'Information');
        }
      });
    } else {
      this.notifyService.showError('Session not valid Login again', 'SESSION ERROR');
      this.router.navigate[('login')];
    }



  }

}
