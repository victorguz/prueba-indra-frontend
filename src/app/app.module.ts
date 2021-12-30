import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './views/app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeLayoutComponent } from './views/layouts/home-layout/home-layout.component';
import { HelpersService } from './core/services/helpers.service';
import { NotificationHelper } from './core/services/helpers/notification.helper';
import { RequestsService } from './core/services/requests.service';
import { SharedModule } from './shared/imports/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    //Admin layout
    HomeLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [HelpersService, NotificationHelper, RequestsService],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }
