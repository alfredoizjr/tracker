import { UserProvider } from './../../providers/user/user';
import { UbicationProvider } from './../../providers/ubication/ubication';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number;
  lng: number;
  userData: any = {};
  constructor(public navCtrl: NavController,
             public _ubicationProvider:UbicationProvider,
            public _userProvider: UserProvider,
            private backgroundMode: BackgroundMode) {

              _ubicationProvider.initDriver();
              _ubicationProvider.initGeolocalisation();
              this.backgroundMode.enable();
              _ubicationProvider.driver.valueChanges().subscribe((data) => {
                  if(!data) return;
                  this.userData = data;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
              });
  }

  logOut() {
    this._ubicationProvider.stopFollowed();
    this._userProvider.destroyKey();
    this.navCtrl.setRoot(LoginPage);
  }

}
