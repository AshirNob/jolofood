import { Component, OnInit } from '@angular/core';
import { NotiService } from '../../services/noti.service'
import * as enc from 'crypto-js';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { DynamicLoaderService } from 'angular-dynamic-loader';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { IconfirmParcel, ConfirmParcelModal } from 'src/app/_shared/models/confrimParcel';
declare const L: any;
@Component({
  selector: 'app-cparcel',
  templateUrl: './cparcel.component.html',
  styleUrls: ['./cparcel.component.css']
})
export class CparcelComponent implements OnInit {
  check: number = 1; latlngs = []; lat1; lng1; lat2; lng2; Edis;date=Date();
  inputs: IconfirmParcel = new ConfirmParcelModal();
  constructor(private spinner: NgxSpinnerService, private userSerive: UserService, private router: Router, private notifyService: NotiService, private loader: DynamicLoaderService) { }

  ngOnInit(): void {

    let mymap = L.map('parcelmap').setView([24.883256799999998, 67.1972809], 15);
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
      }
    });
    var popup = L.popup();
    function onMapClick(e) {

      if (this.check == 1) {
        popup
          .setLatLng(e.latlng)
          .setContent("Your pickup point")
          .openOn(mymap);
        L.marker(e.latlng).addTo(mymap);
        this.latlngs.push(e.latlng);
        this.lat1 = e.latlng.lat;
        this.lng1 = e.latlng.lng;
        this.inputs.pickuplat = e.latlng.lat;
        this.inputs.pickuplng = e.latlng.lng;
        this.check = 2;
      } else if (this.check == 2) {
        popup
          .setLatLng(e.latlng)
          .setContent("Your drop off point ")
          .openOn(mymap);
        L.marker(e.latlng).addTo(mymap);
        this.latlngs.push(e.latlng);
        this.check = 3;
        this.lat2 = e.latlng.lat;
        this.lng2 = e.latlng.lng;
        this.inputs.drop_off_lat = e.latlng.lat;
        this.inputs.drop_off_lng = e.latlng.lng;
        var polyline = L.polyline(this.latlngs, { color: 'red' }).addTo(mymap);
        this.Edis = this.distance(this.lat1, this.lng1, this.lat2, this.lng2, 'k');
        this.inputs.total_distance = this.Edis;
        let time = this.Edis / (30 / 60);
        this.inputs.time = time.toFixed(2);
        mymap.fitBounds(polyline.getBounds());

      } else if (this.check != 1 || this.check != 2) {
        this.notifyService.showError("You already has choose the pick up and drop off location", "Reload the page to change positions");
      } else {
        this.notifyService.showError("You already has choose the pick up and drop off location", "Reload the page to change positions");
      }


    }
    mymap.on('click', onMapClick.bind(this));
    mymap.on('click', onMapClick);
    this.onload();

  }
  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist.toFixed(2);
    }
  }

  onload() {
    this.inputs.pickup_location = localStorage.getItem('pickup');
    this.inputs.drop_off_location = localStorage.getItem('dropoff');
    this.inputs.weight = localStorage.getItem('weight');
  }
  confirm() {
    if (this.inputs.pickup_location == "" ||
      this.inputs.drop_off_location == "" ||
      this.inputs.note =="" ||
      this.inputs.weight =="" ||
      this.inputs.pickuplat ==""  ||
      this.inputs.pickuplng ==""  ||
      this.inputs.drop_off_lat ==""  ||
      this.inputs.drop_off_lng =="" ||
      this.inputs.reciverName=="" ||
      this.inputs.reciverPhone==""
    ) {
      this.notifyService.showError("Please Provide more details", "Incompelete details");
    }else{
      if(sessionStorage.getItem('_id') && sessionStorage.getItem('t') && sessionStorage.getItem('role')){
        this.spinner.show();
        this.inputs.id=enc.AES.decrypt(sessionStorage.getItem('_id'),environment.password).toString(enc.enc.Utf8);
        this.inputs.role=enc.AES.decrypt(sessionStorage.getItem('role'),environment.password).toString(enc.enc.Utf8);
        this.inputs.token=enc.AES.decrypt(sessionStorage.getItem('t'),environment.password).toString(enc.enc.Utf8);
        this.userSerive.confirmparcel(this.inputs).subscribe(Response=>{
          if(Response){
            setTimeout(()=>{
              this.spinner.hide();
            },20000)
            // this.spinner.hide();

          }else{
            this.notifyService.showError("Cant confirm your parcel now","Try again");
          }
        });
      }

    }

  }
}
