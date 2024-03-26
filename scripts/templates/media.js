function mediaTemplate(data, onClick) {
  const { id, title, likes } = data;

  function link() {
    const link = document.createElement("a");

    link.setAttribute(
      "aria-label",
      "Afficher le carrousel d'images, photo actuel" + title
    );
    link.href = "#";
    link.addEventListener("click", function (event) {
      event.preventDefault();
      onClick(id);
    });
    return link;
  }

  function createHeart() {
    const iconCoeur = document.createElement("i");
    iconCoeur.classList.add("fas", "fa-heart", "coeur-full");
    iconCoeur.setAttribute("aria-label", "Cliquez pour aimer cette photo");
    iconCoeur.alt = "Heart";
    return iconCoeur;
  }

  function createHeartAndLike(likes) {
    const containerCoeurLike = document.createElement("div");
    containerCoeurLike.className = "container-like-heart";

    const like = document.createElement("p");
    like.textContent = likes;
    like.setAttribute("aria-label", likes + " likes sur la photo");
    like.classList.add("like-media");
    const iconCoeur = createHeart();

    const totalLikesElement = document.querySelector(".total-like");

    function updateTotalLikes(totalLikesElement) {
      if (!data.likeTrue) {
        let totalLikesCount = parseInt(totalLikesElement.textContent);
        totalLikesCount++;
        totalLikesElement.textContent = totalLikesCount;
      }
    }

    function upLikeMedia() {
      if (!data.likeTrue) {
        data.likes++;
        like.textContent = data.likes;
        data.likeTrue = true;
      }
    }

    iconCoeur.addEventListener("click", function (event) {
      updateTotalLikes(totalLikesElement);
      upLikeMedia();
    });

    containerCoeurLike.appendChild(like);
    containerCoeurLike.appendChild(iconCoeur);
    return containerCoeurLike;
  }

  function createTitle(title) {
    const mediaTitle = document.createElement("p");
    mediaTitle.textContent = title;
    mediaTitle.classList.add("title-media");
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
