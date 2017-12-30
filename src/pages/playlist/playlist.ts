import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavParams, Platform } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { YoutubeProvider } from '../../providers/youtube/youtube';

 
@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  videos: Observable<any[]>;
 
  constructor(private navParams: NavParams, private ytProvider: YoutubeProvider, private youtube: YoutubeVideoPlayer, private plt: Platform) {
    let listId = this.navParams.get('id');
    this.videos = this.ytProvider.getListVideos(listId);
  }
 
  openVideo(video) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    }
  }
}