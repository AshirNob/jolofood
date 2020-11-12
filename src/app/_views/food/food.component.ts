import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { NotiService } from '../../services/noti.service';
import { DynamicLoaderService } from 'angular-dynamic-loader';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  foo;
  cartlist = [];
  constructor(private loader: DynamicLoaderService, private userSerive: UserService, private router: Router, private notifyService: NotiService) { }

  ngOnInit(): void {
    let url: string = this.router.url;
    if (url == "/" || url == "") {
      this.userSerive.getfoods().subscribe(Response => {
        if (Response) {
          this.foo = Response;
        } else {
          this.notifyService.showError("Server too busy", "Retry cant get food items");
        }
      });
    } else if (url == "/foods" || url == "foods") {
      this.userSerive.getfoods().subscribe(Response => {
        if (Response) {
          this.foo = Response;
        } else {
          this.notifyService.showError("Server too busy", "Retry cant get food items");
        }
      });
    }

  }
  async addtocart(e) {
    if (localStorage.getItem('list')) {
      var list = localStorage.getItem('list');
      var glist = JSON.parse(list);
      var i;
      this.cartlist = [];
      for (i = 0; i < glist.length; i++) {
        this.cartlist.push(glist[i]);
      }
      this.cartlist.push(e);
      localStorage.setItem('list', JSON.stringify(this.cartlist));
      localStorage.setItem('cart', this.cartlist.length.toString());
      this.notifyService.showinfocart("Item added to cart", "Info");
      this.loader.show();

      setTimeout(() => {
        this.loader.hide();
        window.location.reload();
      }, 2000);

    }
    else {
      this.cartlist.push(e);
      localStorage.setItem('list', JSON.stringify(this.cartlist));
      localStorage.setItem('cart', this.cartlist.length.toString());
      this.notifyService.showinfocart("Item added to cart", "Info");
      this.loader.show();

      setTimeout(() => {
        this.loader.hide();
        window.location.reload();
      }, 2000);

    }
  }
}
