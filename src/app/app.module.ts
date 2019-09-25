import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { AuthInterceptor } from './auth.interceptor';
import { BoardComponent } from './components/board/board.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { BoardPageComponent } from './components/pages/board-page/board-page.component';
import { BoardTitleComponent } from './components/board-title/board-title.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MainPageComponent,
    BoardComponent,
    MainLayoutComponent,
    BoardPageComponent,
    BoardTitleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
