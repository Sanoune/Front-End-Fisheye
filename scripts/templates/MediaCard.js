class Photo {
    constructor(data) {
      this.title = data.title;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
      this.image = data.image;
    }

    createPhotoElement(data) {
        const photoContainer = createElement('div', ['photo']);
        const photoTitle = createElement('h2', ['photo-title']);
        photoTitle.textContent = data.title;
        const photoLikes = createElement('span', ['photo-likes']);
        photoLikes.textContent = `Likes: ${data.likes}`;
        const photoDate = createElement('span', ['photo-date']);
        photoDate.textContent = `Date: ${data.date}`;
        const photoPrice = createElement('span', ['photo-price']);
        photoPrice.textContent = `Price: ${data.price}`;
        // const photoElement = createElement('img', ['photo-element'], { src: data.image });
      
        photoContainer.appendChild(photoTitle);
        photoContainer.appendChild(photoLikes);
        photoContainer.appendChild(photoDate);
        photoContainer.appendChild(photoPrice);
        photoContainer.appendChild(photoElement);
      
        return photoContainer;
      }
  }
  

  class Video {
    constructor(data) {
      this.title = data.title;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
      this.video = data.video;
    }
    createVideoElement(data) {
        const videoContainer = createElement('div', ['video']);
        const videoTitle = createElement('h2', ['video-title']);
        videoTitle.textContent = data.title;
        const videoLikes = createElement('span', ['video-likes']);
        videoLikes.textContent = `Likes: ${data.likes}`;
        const videoDate = createElement('span', ['video-date']);
        videoDate.textContent = `Date: ${data.date}`;
        const videoPrice = createElement('span', ['video-price']);
        videoPrice.textContent = `Price: ${data.price}`;
        const videoElement = createElement('video', ['video-element'], { src: data.video, controls: true });
      
        videoContainer.appendChild(videoTitle);
        videoContainer.appendChild(videoLikes);
        videoContainer.appendChild(videoDate);
        videoContainer.appendChild(videoPrice);
        videoContainer.appendChild(videoElement);
      
        return videoContainer;
      }
  }

  class MediasFactory {
    
    static createMedia(data) {
        if (data.image) {
            return new Photo(data);
        } else if (data.video) {
            return new Video(data);
        } else {
            throw new Error('Type de média non pris en charge');
        }
    }
}


