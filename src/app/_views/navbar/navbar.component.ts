import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as enc from 'crypto-js';
import { Router } from '@angular/router'
import { windowTime } from 'rxjs-compat/operator/windowTime';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 0;
  cart; check: Boolean; vcheck: Boolean; dpcheck: Boolean; dcheck: Boolean; acheck: Boolean;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.cart = Number(localStorage.getItem('cart'));
    this.ht();
  }
  ht() {
    if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      let role: Number = Number(enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8));
      if (role != null) {
        this.check = true;
      } else {
        this.check = false;
      }
      if (role == 1111) {
        this.vcheck = true;
        this.dcheck=false;
        this.dpcheck=false;
        this.acheck=false;
      } else if (role == 2000) {
        this.dpcheck = true;
        this.vcheck = false;
        this.dcheck=false;
        this.acheck=false;
      } else if (role == 2222) {
        this.dcheck = false;
        this.dpcheck = false;
        this.vcheck = false;
        this.acheck=false;
      }else if(role==9999){
        this.acheck=true;
        this.dcheck = false;
        this.dpcheck = false;
        this.vcheck = false;
      }else{
        this.acheck=false;
        this.dcheck = false;
        this.dpcheck = false;
        this.vcheck = false;
      }
    }
  }
  goto(e) {
    this.router.navigate([e]);
  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['']);

  }
}
