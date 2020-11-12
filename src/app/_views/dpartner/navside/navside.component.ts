import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { NotiService } from '../../../services/noti.service'
@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.css']
})
export class NavsideComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goto(e) {
    this.router.navigate([e]);
  }
}
