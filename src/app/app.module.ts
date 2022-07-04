import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // this is needed!

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { AccountModule } from './account/account.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserRegistrationModule,
    AccountModule,
    ToastrModule.forRoot(),
    NavigationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
