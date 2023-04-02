import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as oauth1 from 'oauth-1.0a';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private oauth: oauth1;
  private token: { key: string; secret: string };

  constructor(private http: HttpClient) {
    this.oauth = new oauth1({
      consumer: { key: 'EDrFq9vvSgYvGTPPv0wWAREyf', secret: '8P71tQdY4PzFv9tOjTN64gbbTs78SaEF6OThbhWxaOMJrhuNWF' },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
      }
    });

    this.token = { key: '86877531-kouL57wxIodfQGg0blW3EO108SJ9UuWbMt9MsB4oa', secret: 'D4JaLkWIIpCgsSYU5pJ90zaxxgpuzCs73diXz6gD8nac8' };
  }

  async postTweet(status: string): Promise<any> {
    const url = 'https://api.twitter.com/1.1/statuses/update.json';
    const requestData = { url, method: 'POST', data: { status } };
    const oauthHeaders = this.oauth.toHeader(this.oauth.authorize(requestData, this.token));

    // Convert the OAuth headers object to a HttpHeaders-compatible object
    const headers = new HttpHeaders({ ...oauthHeaders });

    // Construct the POST body
    const body = new URLSearchParams();
    body.set('status', status);

    return this.http.post(url, body.toString(), { headers }).toPromise();
  }
}
