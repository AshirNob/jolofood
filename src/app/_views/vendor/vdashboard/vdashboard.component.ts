import { Component, OnInit } from '@angular/core';
import { DynamicLoaderService } from 'angular-dynamic-loader';

@Component({
  selector: 'app-vdashboard',
  templateUrl: './vdashboard.component.html',
  styleUrls: ['./vdashboard.component.css']
})
export class VdashboardComponent implements OnInit {

  constructor(private loader: DynamicLoaderService) { }

  ngOnInit(): void {


    this.loader.show();

    setTimeout(() => {
      this.loader.hide();
    }, 1000);
  }

}
