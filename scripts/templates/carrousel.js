function carouselTemplate(medias) {
  let carouselIndex = 0;

  function updateCarousel() {
    const mediaElement = getCurrentCarouselMedia();
    const titleElement = getCurrentCarouselTitle();
    const containerMediasCarousel = document.querySelector(".carousel-media");
    containerMediasCarousel.innerHTML = "";
    containerMediasCarousel.appendChild(mediaElement);
    containerMediasCarousel.appendChild(titleElement);
  }

  function changeCarouselMedia(id) {
    carouselIndex = medias.findIndex((media) => media.id === id);

    updateCarousel();
  }

  function getCurrentCarouselMedia() {
    const media = medias[carouselIndex];
    const mediaInstance = MediaFactory.createMedia(media);
    const elementMedia = mediaInstance.getMediaDom();

    return elementMedia;
  }

  function getCurrentCarouselTitle() {
    const media = medias[carouselIndex];
    const title = document.createElement("p");
    title.innerText = media.title;
    title.classList.add("title-media");
    title.setAttribute("aria-label", "Titre de la photo: " + media.title);
    return title;
  }

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

  function navClavierCarousel(event) {
    event.preventDefault();
    if (event.key === "ArrowRight") {
      actionNext();
    } else if (event.key === "ArrowLeft") {
      actionPrev();
    }
  }

  function closeCarousel() {
    const carouselElement = document.querySelector(".carousel");
    carouselElement.style.display = "none";
    document.removeEventListener("keydown", navClavierCarousel);
    document.removeEventListener("keydown", closeClavierCarousel);
  }

  function closeClavierCarousel(event) {
    if (event.key === "Escape") {
      closeCarousel();
    }
  }

  function openCarousel() {
    const openCarousel = document.querySelector(".carousel");
    openCarousel.style.display = "block";
    document.addEventListener("keydown", closeClavierCarousel);
    document.addEventListener("keydown", navClavierCarousel);
  }

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
