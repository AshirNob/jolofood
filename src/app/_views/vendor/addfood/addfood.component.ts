import { Component, OnInit } from '@angular/core';
import { DynamicLoaderService } from 'angular-dynamic-loader';
import { NotiService } from '../../../services/noti.service'
import * as enc from 'crypto-js';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { loguser } from '../../../_shared/models/loguser';
import { Iaddfood, addfood } from '../../../_shared/models/h_vendor';
@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent implements OnInit {
  lov; req; list;
  food: Iaddfood = new addfood();
  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService, private loader: DynamicLoaderService) { }

  ngOnInit(): void {
    this.loader.show();

    if (sessionStorage.getItem('_id') && sessionStorage.getItem('role') && sessionStorage.getItem('t')) {
      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
      let token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      this.req = new loguser(Number(id), token, Number(role))
      this.userSerive.getbranches(this.req).subscribe(Response => {
        if (Response) {
          this.lov = Response;
        }
        else {
          this.notifyService.showInfo('NO Reuqests Founds', 'Information');
        }
      });
    } else {
      this.notifyService.showError('Session not valid Login again', 'SESSION ERROR');
      this.router.navigate[('login')];
    }

    setTimeout(() => {
      this.loader.hide();
    }, 900);
  }
  addfod(form: NgForm) {
    if (form.invalid) {
      this.notifyService.showError("Form not valid", "ERROR");
      console.log(this.food);

    } else if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      this.loader.show();
      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
      this.food.id = id; this.food.authtoken = token; this.food.role = role;
      console.log(this.food);
      this.userSerive.addfood(this.food);
      setTimeout(() => {
        this.loader.hide();
      }, 1000);
     this.food.id=null;
     this.food.authtoken=null;
     this.food.role=null;
     this.food.fname=null;
     this.food.ftype=null;
     this.food.bid=null;
     this.food.desc=null;
     this.food.image=null;
     this.food.preptime=null;
     this.food.price=null;

      this.notifyService.showSuccess("Food Added", "Success");
    } else {
      this.notifyService.showError("user not valid", "Error");
      this.router.navigate(['login']);
    }


  }
  selectbimage(event) {
    var file = event.target.files[0];
    var basestring;
    if (file) {
      let me = this;
      var reader = new FileReader();
      reader.onload = function (readerEvt) {
        var binaryString: any = readerEvt.target.result;
        basestring = (window.btoa(binaryString));
        me.food.image = basestring;

      };
      reader.readAsBinaryString(file);

    }


  }

}
