import { Subscription } from 'rxjs/Subscription';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

key :string;
user: any = {};

private doc: Subscription;

  constructor(private afDb: AngularFirestore,
              private storage: Storage,
              private platform:Platform) {
   
  }

  verifyUser(key:string) {

    let kay = key.toLocaleLowerCase();
    return new Promise((resolve, reject) =>{
      this.doc = this.afDb.collection('user').doc(key).valueChanges()
          .subscribe((data) => {
              
            if(data) {
              this.key = key;
              this.user = data;
              this.saveInStorage();
              resolve(true);
            }else {
              resolve(false);
            }
          })
    });
  }

  saveInStorage() {
    if(this.platform.is('cordova')) {
     // mobile
     this.storage.set('key', this.key);
    }else {
      // descktop
      localStorage.setItem('key', this.key);

    }
  }

  loadFromTheStorage() {
    return new Promise((resolve,reject) => {
      if(this.platform.is('cordova')) {
        // mobile
        this.storage.get('key').then((val)=>{
          if(val) {
            this.key = val;
            resolve(true);
          }else {
            resolve(false);
          }
        });
       }else {
         // descktop
         if(localStorage.getItem('key')){
           this.key = localStorage.getItem('key');
           resolve(true);
         } else {
           resolve(false);
         }
            
       }
    });
  }


  destroyKey() {
    this.key = null;

    if(this.platform.is('cordova')) {
      // mobile
      this.storage.remove('key');
    }else {
      localStorage.removeItem('key');
    }

    this.doc.unsubscribe();
          
  }
}
