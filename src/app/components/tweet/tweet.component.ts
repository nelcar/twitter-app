import { Component } from '@angular/core';
import { TwitterService } from 'src/app/services/twitter.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent {
  status = '';

  constructor(private twitterService: TwitterService) {}

  async onSubmit() {
    if (this.status) {
      try {
        const response = await this.twitterService.postTweet(this.status);
        console.log(response);
        alert('Tweet publicado exitosamente');
        this.status = '';
      } catch (error) {
        console.error(error);
        alert('Hubo un error al publicar el tweet');
      }
    } else {
      alert('Por favor, escribe un tweet antes de enviar');
    }
  }
}
