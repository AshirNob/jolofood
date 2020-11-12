import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { loguser } from '../../../_shared/models/loguser';
import { NotiService } from '../../../services/noti.service'
import * as enc from 'crypto-js';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-musers',
  templateUrl: './musers.component.html',
  styleUrls: ['./musers.component.css']
})
export class MusersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  users;
  luser;
  incre=1;
  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [25, 50]

    };
    if (sessionStorage.getItem('_id') && sessionStorage.getItem('role') && sessionStorage.getItem('t')) {
      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
      let token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      if (role === '9999') {
        this.luser = new loguser(Number(id), token, Number(role));
        this.userSerive.getusers(this.luser).subscribe(Response => {
          if (Response) {
            this.users = Response;
          }
          else {
            this.notifyService.showError("Can't find users ", "Role not valid");
            this.router.navigate(['login']);
            sessionStorage.clear();
          }
        });

      } else {
        sessionStorage.clear();
        this.router.navigate(['login']);
      }
    } else {
      this.router.navigate(['login']);
      this.notifyService.showError('Session not available', 'please login');
    }



  }

}
