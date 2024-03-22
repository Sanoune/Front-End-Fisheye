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


  const buttonNext = document.querySelector(".next");
  buttonNext.addEventListener("click", () => {
    carouselIndex++;

    if (carouselIndex >= medias.length) {
      carouselIndex = 0;
    }

    updateCarousel();
  });

  const buttonPrev = document.querySelector(".prev");
  buttonPrev.addEventListener("click", () => {
    carouselIndex--;
    if (carouselIndex < 0) {
      carouselIndex = medias.length - 1;
    }
    updateCarousel();
  });

  function closeModal() {
    const closeCarousel = document.querySelector(".carousel");
    const closeButton = document.querySelector(".carousel-close");

    closeButton.addEventListener("click", function (event) {
      closeCarousel.style.display = "none";
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeCarousel.style.display = "none";
      }
    });
  }

  closeModal();

  return { closeModal, updateCarousel, changeCarouselMedia };
}
