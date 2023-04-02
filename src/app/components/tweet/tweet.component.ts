import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/services/twitter.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  tweets: any[] = [];
  publishedTweets: any[] = [];

  constructor(private twitterService: TwitterService, private http: HttpClient) { }

  async ngOnInit() {
    const response = await this.http.get<any[]>('assets/tweets.json').toPromise();
    if (response) {
      this.tweets = response;
    }
  
    const lastTweetId = localStorage.getItem('lastTweetId');
    if (lastTweetId) {
      this.tweets = this.tweets.filter(tweet => tweet.id > +lastTweetId);
    }
  }
  

  async postTweets() {
    for (const tweet of this.tweets) {
      await this.twitterService.postTweet(tweet.tweet);
      this.publishedTweets.push(tweet);
      localStorage.setItem('lastTweetId', tweet.id.toString());
      await new Promise(resolve => setTimeout(resolve, 25 * 60 * 1000));
    }
  }
  
}
