import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public loadingControler:LoadingController,
              public _userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  showInput() {
    this.alertCtrl.create({
       title: 'Insert user',
       inputs: [{
         name:'username',
         placeholder: 'Username'
       }],
       buttons:[{
         text:'Cancel',
         role: 'cancel'
       },{
         text: 'Sing in',
         handler: data =>{
           this.verifyUser(data.username);
         }
       }]
    }).present();
  }

  verifyUser(data: string) {
    let loading = this.loadingControler.create({
      content: 'verifying wait...'
    });
   if(!data) {
    this.alertCtrl.create({
      title: 'Empty',
      subTitle: 'You need fill out this field',
      buttons: ['ok'],
    }).present();
    return;
   }
    this._userProvider.verifyUser(data)
        .then((exits) => {
           if(exits){
            loading.dismiss();
            this.slides.lockSwipes(false);
            this.slides.freeMode = true;
            this.slides.slideNext();
            this.slides.lockSwipes(true);
            this.slides.freeMode = false;
           }else{
              this.alertCtrl.create({
                title: 'User Invalid',
                subTitle: 'Contact your provider or try one more time',
                buttons: ['ok'],
              }).present();
           }
        });
  }

  singIn() {
    this.navCtrl.setRoot(HomePage);
  }

}
