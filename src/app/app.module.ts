import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
