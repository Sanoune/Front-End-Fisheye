class FactoryVideo {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.type = "video";
    this.url = `${data.pathname}/${data.video}`;
  }

  createMedia() {
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

class FactoryPhoto {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.type = "image";
    this.url = `${data.pathname}/${data.image}`;
  }

  createMedia() {
    
    const mediaElement = document.createElement("img");
    mediaElement.src = this.url;
    mediaElement.alt = this.title;
    mediaElement.classList.add("media-image-video");
    return mediaElement;
  }
}

class MediasFactory {
  static createMedia(data) {
    if (data.image) {
      return new FactoryPhoto(data); // Utiliser la méthode createPhotoElement pour créer l'élément
    } else if (data.video) {
      return new FactoryVideo(data); // Utiliser la méthode createVideoElement pour créer l'élément
    } else {
      throw new Error("Type de média non pris en charge");
    }
  }
}
