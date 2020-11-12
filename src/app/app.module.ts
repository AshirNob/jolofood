import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { DynamicLoaderModule } from 'angular-dynamic-loader';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
//componenets
import { AppComponent } from './app.component';
import { NavbarComponent } from './_views/navbar/navbar.component';
import { LoginComponent } from './_views/login/login.component';
import { SignupComponent } from './_views/signup/signup.component';
import { HeaderHomeComponent } from './_views/header-home/header-home.component';
import { UserDashboardProfileComponent } from './_views/user-dashboard-profile/user-dashboard-profile.component';
import { TopbarComponent } from './_views/admin/topbar/topbar.component';
import { SidebareComponent } from './_views/admin/sidebare/sidebare.component';
import { MusersComponent } from './_views/admin/musers/musers.component';
import { VrequestComponent } from './_views/admin/vrequest/vrequest.component';
import { VenlistComponent } from './_views/admin/venlist/venlist.component';
import { SidenavComponent } from './_views/vendor/sidenav/sidenav.component';
import { TopnavComponent } from './_views/vendor/topnav/topnav.component';
import { AddbranchComponent } from './_views/vendor/addbranch/addbranch.component';
import { ListbranchComponent } from './_views/vendor/listbranch/listbranch.component';
import { AddfoodComponent } from './_views/vendor/addfood/addfood.component';
import { ListfoodComponent } from './_views/vendor/listfood/listfood.component';
import { AdddealComponent } from './_views/vendor/adddeal/adddeal.component';
import { ListdealComponent } from './_views/vendor/listdeal/listdeal.component';
import { VdashboardComponent } from './_views/vendor/vdashboard/vdashboard.component';
import { SecaboutComponent } from './_views/secabout/secabout.component';
import { HomeComponent } from './_views/home/home.component';
import { FoodComponent } from './_views/food/food.component';
import { CartComponent } from './_views/cart/cart.component';
import { FooterComponent } from './_views/footer/footer.component';
import { NavtopComponent } from './_views/dpartner/navtop/navtop.component';
import { NavsideComponent } from './_views/dpartner/navside/navside.component';
import { DpdashboardComponent } from './_views/dpartner/dpdashboard/dpdashboard.component';
import { AdddriverComponent } from './_views/dpartner/adddriver/adddriver.component';
import { ListdriverComponent } from './_views/dpartner/listdriver/listdriver.component';
import { ContactusComponent } from './_views/contactus/contactus.component';
import { AdddpComponent } from './_views/admin/adddp/adddp.component';
import { DplistComponent } from './_views/admin/dplist/dplist.component';
import { CparcelComponent } from './_views/cparcel/cparcel.component';
import { AboutpageComponent } from './_views/aboutpage/aboutpage.component';
import { ViewfoodsComponent } from './_views/viewfoods/viewfoods.component';
import { FaqComponent } from './_views/faq/faq.component';





const routs: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userdashboard', component: UserDashboardProfileComponent },
  { path: 'admin', component: MusersComponent },
  { path: 'vendoreqest', component: VrequestComponent },
  { path: 'vlist', component: VenlistComponent },
  { path: 'vdashboard', component: VdashboardComponent },
  { path: 'vaddbranch', component: AddbranchComponent },
  { path: 'vblist', component: ListbranchComponent },
  { path: 'vaddfood', component: AddfoodComponent },
  { path: 'vflist', component: ListfoodComponent },
  { path: 'vadddeal', component: AdddealComponent },
  { path: 'vdlist', component: ListdealComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'dpdasboard', component: DpdashboardComponent },
  { path: 'addriver', component: AdddriverComponent },
  { path: 'listdriver', component: ListdriverComponent },
  { path: 'adp', component: AdddpComponent },
  { path: 'adplist', component: DplistComponent },
  { path: 'confirmParcel', component: CparcelComponent },
  { path: 'AboutUs', component: AboutpageComponent },
  { path: 'foods', component: ViewfoodsComponent },
  { path: 'faqs', component: FaqComponent },
  { path: 'signup', component: SignupComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HeaderHomeComponent,
    UserDashboardProfileComponent,
    TopbarComponent,
    SidebareComponent,
    MusersComponent,
    VrequestComponent,
    VenlistComponent,
    SidenavComponent,
    TopnavComponent,
    AddbranchComponent,
    ListbranchComponent,
    AddfoodComponent,
    ListfoodComponent,
    AdddealComponent,
    ListdealComponent,
    VdashboardComponent,
    SecaboutComponent,
    HomeComponent,
    FoodComponent,
    CartComponent,
    FooterComponent,
    NavtopComponent,
    NavsideComponent,
    DpdashboardComponent,
    AdddriverComponent,
    ListdriverComponent,
    ContactusComponent,
    AdddpComponent,
    DplistComponent,
    CparcelComponent,
    AboutpageComponent,
    ViewfoodsComponent,
    FaqComponent

  ],
  imports: [
    RouterModule.forRoot(routs),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    NgxSpinnerModule,
    DynamicLoaderModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
