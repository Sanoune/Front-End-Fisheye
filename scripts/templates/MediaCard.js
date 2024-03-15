class Video {
  constructor(data) {
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.video = data.video;
  }
}

class Photo {
  constructor(data) {
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.image = data.image;
  }

  getDOMElement() {
    return 2;
  }

  static test() {

  }
}


class MediaFactory {
     static createMedia(data) {

    }
}

const photoinstance = new Photo({})
photoinstance.getDOMElement();
Photo.test()