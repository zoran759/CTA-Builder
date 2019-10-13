import { services } from "../defines";
import { request } from "../utils/request";

export default class shortLinks {
  constructor() {
    this.key = services.shortLinksKey;
    this.loading = false;
  }

  set(url) {

    const data = {
      "longDynamicLink": url,
    }

    request('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key='+this.key, data,  "POST")
      .then((posts) => {
        console.log('Success!', posts);
      })
      .catch((error) => {
        console.log('Something went wrong', error);
      });
  }

}