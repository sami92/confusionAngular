import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider'; 
import { MatProgressSpinnerModule } from'@angular/material/progress-spinner'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from "./app.component";
import "hammerjs";
import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component'

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { LoginComponent } from './login/login.component';

import { baseURL } from "./shared/baseUrl";
@NgModule({
  declarations: [AppComponent, MenuComponent, DishdetailComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent, ContactComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [LoginComponent],
  providers: [DishService, PromotionService, LeaderService,ProcessHTTPMsgService,  {provide: 'BaseURL', useValue: baseURL}],
  bootstrap: [AppComponent],
})
export class AppModule { }
