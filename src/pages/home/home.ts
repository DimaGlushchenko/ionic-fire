import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { YoutubeProvider } from '../../providers/youtube/youtube';

import { FcmProvider } from '../../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  channelId = '';
  playlists: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private ytProvider: YoutubeProvider,
    private alertCtrl: AlertController,
    public fcm: FcmProvider,
    public toastCtrl: ToastController
  ) { }

  searchPlaylists() {
    this.playlists = this.ytProvider.getPlaylistsForChannel(this.channelId);
    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists found for that Channel ID',
        buttons: ['OK']
      });
      alert.present();
    })
  }

  openPlaylist(id) {
    this.navCtrl.push('PlaylistPage', { id: id });
  }

  ionViewDidLoad() {

    // Get a FCM token
    this.fcm.getToken()

    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
      .subscribe()
  }
}
