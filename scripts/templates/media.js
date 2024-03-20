function mediaTemplate(data, onClick) {
  const { id, title, likes } = data;

  function link() {
    const link = document.createElement("a");
    link.setAttribute("aria-label", "Afficher le carrousel d'images");
    link.href = "#";
    const openCarousel = document.querySelector(".carousel");
    link.addEventListener("click", function (event) {
      event.preventDefault();
      onClick(id);
      openCarousel.style.display = "block";
    });
    return link;
  }

  function createHeartAndLike(likes) {
    const containerCoeurLike = document.createElement("div");
    containerCoeurLike.className = "container-like-heart";

    const like = document.createElement("p");
    like.textContent = likes;
    like.setAttribute("aria-label", "Nombre de like sur la photo" + like);

    const imageCoeur = document.createElement("img");
    imageCoeur.src = "./assets/icons/heart.png";
    imageCoeur.alt = "Heart";
    imageCoeur.classList = "heart-icon";
    imageCoeur.setAttribute("aria-label", "Cliquez pour aimer cette photo");

    containerCoeurLike.appendChild(like);
    containerCoeurLike.appendChild(imageCoeur);
    return containerCoeurLike;
  }

  function createTitle(title) {
    const mediaTitle = document.createElement("p");
    mediaTitle.textContent = title;
    mediaTitle.setAttribute("aria-label", "Titre de la photo" + title);
    return mediaTitle;
  }

  function containerInfosMedia() {
    const containerInfosMedia = document.createElement("div");
    containerInfosMedia.className = "infos-media";
    const titleImg = createTitle(title);
    const heartAndLike = createHeartAndLike(likes);
    containerInfosMedia.appendChild(titleImg);
    containerInfosMedia.appendChild(heartAndLike);
    return containerInfosMedia;
  }

  function getMediaCardDOM() {
    const mediaContainer = document.createElement("div");
    mediaContainer.className = "media-container";
    const linkMedia = link();
    const InfosMedia = containerInfosMedia();
    const mediaInstance = MediaFactory.createMedia(data);
    const elementMedia = mediaInstance.getMediaDom();
    linkMedia.appendChild(elementMedia);
    mediaContainer.appendChild(linkMedia);
    mediaContainer.appendChild(InfosMedia);
    return mediaContainer;
  }

  return { getMediaCardDOM };
}
