import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { TwitterService } from 'src/app/services/twitter.service';

@NgModule({
  declarations: [AppComponent, TweetComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [TwitterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
