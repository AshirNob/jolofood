import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { IUser, UserModel } from '../../_shared/models/user';
import { NgForm } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { NotiService } from '../../services/noti.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: IUser = new UserModel();



  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {

  }


  selectImage(event) {
    var file = event.target.files[0];

    var basestring;
    if (file) {
      let me = this;
      var reader = new FileReader();
      reader.onload = function (readerEvt) {
        var binaryString: any = readerEvt.target.result;
        basestring = (window.btoa(binaryString));
        me.user.profilepicture = basestring;
      };
      reader.readAsBinaryString(file);
    }


  }
  onAddsubmit(form: NgForm, user = this.user) {
    if (form.invalid) {
   this.notifyService.showError('Invelid form','try again');
    }else{
      let pass = Md5.hashStr(user.pass).toString();
      let us:IUser=new UserModel(user.firstname,user.middlename,user.lastname,pass,user.number,user.location,user.profilepicture,user.email);
      this.userSerive.adduser(us);
      this.router.navigate(['login']);
    }

  }

}
