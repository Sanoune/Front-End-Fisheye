function carouselTemplate(medias) {
  // Initialise l'index du carousel à 0
  let carouselIndex = 0;

  // Met à jour le contenu du carousel avec le media actuel
  function updateCarousel() {
    const mediaElement = getCurrentCarouselMedia();
    const titleElement = getCurrentCarouselTitle();
    const containerMediasCarousel = document.querySelector(".carousel-media");
    containerMediasCarousel.innerHTML = "";
    containerMediasCarousel.appendChild(mediaElement);
    containerMediasCarousel.appendChild(titleElement);
  }
  // Change le media actuel du carousel en fonction de son ID
  function changeCarouselMedia(id) {
    carouselIndex = medias.findIndex((media) => media.id === id);
    updateCarousel();
  }

  //utilisation mediaFactory pour creation des medias carousel via index
  function getCurrentCarouselMedia() {
    const media = medias[carouselIndex];
    const mediaInstance = MediaFactory.createMedia(media);
    const elementMedia = mediaInstance.getMediaDom();

    return elementMedia;
  }

  // creation titre sous photo carousel via son index
  function getCurrentCarouselTitle() {
    const media = medias[carouselIndex];
    const title = document.createElement("p");
    title.innerText = media.title;
    title.classList.add("title-media");
    title.setAttribute("aria-label", "Titre de la photo: " + media.title);
    return title;
  }
  // Action pour passer au prochain media dans le carousel au click fleche
  function actionNext() {
    carouselIndex++;
    if (carouselIndex >= medias.length) {
      carouselIndex = 0;
    }
    updateCarousel();
  }

  const buttonNext = document.querySelector(".next");
  buttonNext.addEventListener("click", () => {
    actionNext();
  });

  // Action pour revenir au media précédent dans le carousel au click sur fleche
  function actionPrev() {
    carouselIndex--;
    if (carouselIndex < 0) {
      carouselIndex = medias.length - 1;
    }
    updateCarousel();
  }
  const buttonPrev = document.querySelector(".prev");
  buttonPrev.addEventListener("click", () => {
    actionPrev();
  });

  // Action clavier pour naviguer dans le carousel
  function navClavierCarousel(event) {
    event.preventDefault();
    if (event.key === "ArrowRight") {
      actionNext();
    } else if (event.key === "ArrowLeft") {
      actionPrev();
    }
  }
  // Action clavier pour fermer le carousel
  function closeCarousel() {
    const carouselElement = document.querySelector(".carousel");
    carouselElement.style.display = "none";
    document.removeEventListener("keydown", navClavierCarousel);
    document.removeEventListener("keydown", closeClavierCarousel);
  }
  //fermer carousel au clavier
  function closeClavierCarousel(event) {
    if (event.key === "Escape") {
      closeCarousel();
    }
  }
  // Action pour ouvrir le carousel lors du clic sur le bouton de me contacter
  function openCarousel() {
    const openCarousel = document.querySelector(".carousel");
    openCarousel.style.display = "block";
    document.addEventListener("keydown", closeClavierCarousel);
    document.addEventListener("keydown", navClavierCarousel);
  }

  // Action pour fermer le carousel lors du clic sur le bouton de fermeture
  const closeButton = document.querySelector(".carousel-close");
  closeButton.addEventListener("click", function (event) {
    closeCarousel();
  });

  return {
    updateCarousel,
    changeCarouselMedia,
    openCarousel,
    navClavierCarousel,
  };
}
