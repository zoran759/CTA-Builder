import { services } from "../defines";
import { request } from "../utils/request";

export default class shortLinks {
  constructor() {
    this.key = services.shortLinksKey;
    this.domain = services.shortLinksDomain;
    this.loading = false;
    this.shortLink = null;
  }

  set(url, callback) {

    const data = {
      "longDynamicLink": this.domain+"/?link="+url,
      "suffix": {
        "option": "SHORT"
      }
    }

    request('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key='+this.key, data,  "POST")
      .then((result) => {
        result = JSON.parse(result.response)
        this.shortLink = result.shortLink;
        callback(this.shortLink);
      })
      .catch((error) => {
        console.log('Something went wrong', error);
      });
  }

}