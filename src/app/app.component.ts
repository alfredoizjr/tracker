import { UserProvider } from './../providers/user/user';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public _userProvider: UserProvider) {

    platform.ready().then(() => {
      
      _userProvider.loadFromTheStorage().then((exist) => {

        statusBar.styleDefault();
        splashScreen.hide();

        if (exist) {
          this.rootPage = HomePage;
        }else {
          this.rootPage = LoginPage;
        }
      });
    });
  }
}

