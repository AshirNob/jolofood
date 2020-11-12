import { Component, OnInit } from '@angular/core';
import { NotiService } from 'src/app/services/noti.service'
import * as enc from 'crypto-js';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router'
import { DynamicLoaderService } from 'angular-dynamic-loader';
import { environment } from 'src/environments/environment';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { observable } from 'rxjs';
import { cart } from 'src/app/_shared/models/cart';
import { stringify } from '@angular/compiler/src/util';
import { async } from 'rxjs/internal/scheduler/async';
declare const L: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = []; k; price; totalitem; totalpriceshow = 0; totalpricehide; lat; lng;
  constructor(private userSerive: UserService, private router: Router, private notifyService: NotiService, private loader: DynamicLoaderService) { }
  getpro() {
    var stringlist = localStorage.getItem('list');
    var list = JSON.parse(stringlist);
    list.forEach(element => {
      this.userSerive.getcartlist(element).subscribe(Response => {
        if (Response) {
          this.cart.push(Response);
          this.k = Response;
          this.totalitem = this.cart.length;
          this.totalpriceshow = 0;
          for (var ii in this.cart) {
            this.totalpriceshow += this.cart[ii].price;
          }
        } else {
          console.log("Error");
        }
      });
    });


  }
  ngOnInit(): void {

    let mymap = L.map('cartmap').setView([9.042597363580477, 7.491474151611329], 13);
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
    });
    var markers = {};
    function onMapClick(e) {
      if (markers != undefined) {
        mymap.removeLayer(markers);
      }
      markers = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(mymap)
        .bindPopup('You choose this location')
        .openPopup();
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
      console.log(this.lat, this.lng);
    }
    mymap.on('click', onMapClick.bind(this));
    mymap.on('click', onMapClick);


    this.getpro();

  }

  addquantity(ca, i) {
    this.cart[i].quantity += 1;
    this.userSerive.getcartlist(this.cart[i].id).subscribe(Response => {
      if (Response) {
        this.price = Response;
        this.cart[i].price = this.cart[i].quantity * this.price.price;
        this.totalpriceshow = 0;
        for (var iii of this.cart) {
          this.totalpriceshow += iii.price;
        }
      } else {
        console.log("Error");
      }
    });
    this.totalitem = this.cart.length;
  }


  delquantity(ca, i) {
    if (this.cart[i].quantity > 1) {
      this.cart[i].quantity -= 1;
      this.userSerive.getcartlist(this.cart[i].id).subscribe(Response => {
        if (Response) {
          this.price = Response
          this.cart[i].price = this.cart[i].quantity * this.price.price;
          this.totalpriceshow = 0;
          for (var iiii of this.cart) {
            this.totalpriceshow -= iiii.price;
            console.log(iiii.price);
          }
        } else {
          console.log("Error");
        }
      });
    }
    this.totalitem = this.cart.length;

  }
  removeitem(ca, i) {
    this.cart.splice(i, 1);
    this.totalpriceshow = 0;
    for (var le in this.cart) {
      this.totalpriceshow += this.cart[le].price;
    }
    this.totalitem = this.cart.length;
  }

  sendthis() {
    console.log(this.cart);
  }

}


