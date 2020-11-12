import { Component, OnInit } from '@angular/core';
import { NotiService } from '../../../services/noti.service'
import * as enc from 'crypto-js';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'
import { DynamicLoaderService } from 'angular-dynamic-loader';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

import { addbranch, Iaddbrach } from '../../../_shared/models/h_vendor';

declare const L: any;
@Component({
  selector: 'app-addbranch',
  templateUrl: './addbranch.component.html',
  styleUrls: ['./addbranch.component.css']
})
export class AddbranchComponent implements OnInit {
  branch: Iaddbrach = new addbranch();

  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService, private loader: DynamicLoaderService) { }

  ngOnInit(): void {
    this.loader.show();
    if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      let mymap = L.map('mapid').setView([9.042597363580477, 7.491474151611329], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: environment.access_t
      }).addTo(mymap);
      var searchControl = new L.esri.Controls.Geosearch().addTo(mymap);

      var results = new L.LayerGroup().addTo(mymap);

      searchControl.on('results', function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
        }
      });
      var popup = L.popup();


      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You choose this location")
          .openOn(mymap);
        this.branch.lat = e.latlng.lat;
        this.branch.long = e.latlng.lng;
      }
      mymap.on('click', onMapClick.bind(this));
      mymap.on('click', onMapClick);
    } else {
      this.router.navigate(['login']);
      this.notifyService.showError('User not valid', 'Error');
    }
    setTimeout(() => {
      this.loader.hide();
    }, 900);

  }


  addbranch(f: NgForm) {
    this.loader.show();
    if (f.invalid) {
      this.notifyService.showError("Please fill the compelet form", "Error");
    } else if (sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')) {
      let id = enc.AES.decrypt(sessionStorage.getItem('_id'), environment.password).toString(enc.enc.Utf8);
      let token = enc.AES.decrypt(sessionStorage.getItem('t'), environment.password).toString(enc.enc.Utf8);
      let role = enc.AES.decrypt(sessionStorage.getItem('role'), environment.password).toString(enc.enc.Utf8);
      this.branch.id = id; this.branch.authtoken = token; this.branch.role = role;
      this.userSerive.addbranch(this.branch);

    }
    setTimeout(() => { this.loader.hide(); }, 700);
    this.notifyService.showSuccess("Branch has been created ..!", "Success");
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
        me.branch.image = basestring;
      };
      reader.readAsBinaryString(file);

    }


  }

}
