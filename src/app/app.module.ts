import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HttpModule } from "@angular/http";

import { YoutubeProvider } from "../providers/youtube/youtube";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";

import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { environment } from "../environments/environment";
import { FcmProvider } from '../providers/fcm/fcm';


@NgModule({
  declarations: [MyApp, HomePage, ListPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListPage],
  providers: [
    Firebase,
    FcmProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    YoutubeProvider,
    YoutubeVideoPlayer,
  ]
})
export class AppModule { }
