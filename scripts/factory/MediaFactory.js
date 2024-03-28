//classe en commun dont vont herite tous mes types de medias
class Media {
  constructor(data) {
    //commun a tout medias
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
// envoi erreur si la methode n'est pas implementé 
  getMediaDom() {
    throw new Exception("Not implemented");
  }
}

class Video extends Media {
  constructor(data) {
    //appeler methode parent
    super(data);
    //specificite videos
    this.type = "video";
    this.url = `${data.pathname}/${data.video}`;
  }

  getMediaDom() {
    const mediaElement = document.createElement("video");
    mediaElement.classList.add("media-image-video");
    mediaElement.setAttribute("controls", "");
    const sourceElement = document.createElement("source");
    sourceElement.src = this.url;
    sourceElement.type = "video/mp4";
    mediaElement.appendChild(sourceElement);
    return mediaElement;
  }
}

class Photo extends Media {
  constructor(data) {
    super(data);
    // specificite photos
    this.name = data.name;
    this.type = "image";
    this.url = `${data.pathname}/${data.image}`;
  }

  getMediaDom() {
    const mediaElement = document.createElement("img");
    mediaElement.src = this.url;
    mediaElement.alt = this.title;
    mediaElement.classList.add("media-image-video");
    return mediaElement;
  }
}

//fabrique d'object media 
class MediaFactory {
  static createMedia(data) {
    if (data.image) {
      return new Photo(data); // Utiliser la méthode createPhotoElement pour créer l'élément
    } else if (data.video) {
      return new Video(data); // Utiliser la méthode createVideoElement pour créer l'élément
    } else {
      throw new Error("Type de média non pris en charge");
    }
  }
}
