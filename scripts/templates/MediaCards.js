function creatMediaCards(data) {
  const { title, likes,pathname,image} = data;

  const link = document.createElement("a");
  link.setAttribute("aria-label", "Afficher le carrousel d'images en grand");
  link.href = "#";

  const imageElementCarousel = document.getElementById('image-carousel');



  link.addEventListener('click', function() {
    const imagePath =`${pathname}/${image}`
    console.log("Vous avez cliqué sur l'image avec le titre:", title);
    console.log("Chemin de l'image:", imagePath);
    imageElementCarousel.src = imagePath;
    imageElementCarousel.alt = title;
    imageElementCarousel.setAttribute('aria-label', "Description de l'image: " + title);


  });


  const containerParentsPhotosInfosMedias = document.createElement("div");
  containerParentsPhotosInfosMedias.classList.add("container-parent-photos-infosMedias");
  const containerMediasInfo = document.createElement("div");
  const containerMediasInfoLikeHeart = document.createElement("div");
  containerMediasInfoLikeHeart.classList.add("container-like-heart");
  const imageCoeur = document.createElement("img")
  imageCoeur.src = "./assets/icons/heart.png";
  imageCoeur.alt = "Heart";
  imageCoeur.classList.add("heart-icon");
  containerMediasInfo.classList.add("container-media-info");
  const mediaTitle = document.createElement("p");
  mediaTitle.textContent = title;
  const like = document.createElement("p");
  like.textContent = likes;



  
  containerMediasInfo.appendChild(mediaTitle);
  containerMediasInfo.appendChild(containerMediasInfoLikeHeart);
  containerMediasInfoLikeHeart.appendChild(like);
  containerMediasInfoLikeHeart.appendChild(imageCoeur)
  containerParentsPhotosInfosMedias.appendChild(link);
  containerParentsPhotosInfosMedias.appendChild(containerMediasInfo);

  function newsElementsCard(data, parent) {
    const mediaInstance = MediasFactory.createMedia(data);
    const NewElementMedia = mediaInstance.createMedia();
    parent.appendChild(NewElementMedia);
  }

  newsElementsCard(data, link);

  return containerParentsPhotosInfosMedias;
}
