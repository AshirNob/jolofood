import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { NotiService } from '../../services/noti.service';
import { DynamicLoaderService } from 'angular-dynamic-loader';

@Component({
  selector: 'app-viewfoods',
  templateUrl: './viewfoods.component.html',
  styleUrls: ['./viewfoods.component.css']
})
export class ViewfoodsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

}
