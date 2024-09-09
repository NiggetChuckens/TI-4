import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular/jwtprovider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: '',
      clientId: '',
      redirectUri: window.location.origin + '/callback',
      scope: 'openid profile email',
      audience: '',
      config: {
        useRefreshToken: true,
        useNewSigninPage: false,
        signOutReturnUrl: '/'
      },
      auth: {
        params: {
          prompt: 'select_account'
        }
      }
    }),
  ],
  providers: [
    AuthHttpInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }