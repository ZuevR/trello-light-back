import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    AuthRoutingModule
  ],
  exports: [],
  providers: []
})
export class AuthModule { }
