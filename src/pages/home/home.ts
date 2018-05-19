import { UserProvider } from './../../providers/user/user';
import { UbicationProvider } from './../../providers/ubication/ubication';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

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
            public _userProvider: UserProvider) {

              _ubicationProvider.initDriver();
              _ubicationProvider.initGeolocalisation();
              
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
