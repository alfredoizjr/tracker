import { UserProvider } from './../user/user';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UbicationProvider {

  driver: AngularFirestoreDocument<any>;
  private wach: Subscription;

  constructor(private geolocation: Geolocation, 
              private afDb: AngularFirestore,
             public _userProvider: UserProvider) {

           
  }

initDriver() {
  this.driver = this.afDb.collection('user').doc(this._userProvider.key);  
}

initGeolocalisation() {
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    this.driver.update({
      lat:resp.coords.latitude,
      lng: resp.coords.longitude,
      key: this._userProvider.key
    });

    this.wach = this.geolocation.watchPosition()
      .subscribe((data) => {
        this.driver.update({
          lat:data.coords.latitude,
          lng:data.coords.longitude,
          key: this._userProvider.key
        });
    });

   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
}

stopFollowed() {

  try {
    this.wach.unsubscribe();
  }catch(e) {
    console.log(JSON.stringify(e))
  }
 
}

}
