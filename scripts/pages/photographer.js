//modification fleche menue deroulant
const buttonIcon = document.querySelector(".fleche");
const dropdownMenu = document.getElementById("dropdownMenu");
function toggleDropdown() {
  dropdownMenu.hidden = !dropdownMenu.hidden;

  if (dropdownMenu.hidden) {
    buttonIcon.src = "./assets/icons/fleche-vers-le-bas.png";
  } else {
    buttonIcon.src = "./assets/icons/fleche-vers-le-haut.png";
  }
}

//modification fleche menue deroulant clavier
buttonIcon.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    toggleDropdown();
  }
});

// function qui appels d'autres functions pour creer les éléments dynamiquement pour la page photographer
async function displayData(photographer) {
  const photographerInfo = document.querySelector(".infos-photographer");
  const photographerImg = document.querySelector(".photographer-img");
  const photographerModel = photographerTemplate(photographer);
  const photographerModalName = document.getElementById(
    "name-personalized-modal"
  );

  const nameElement = photographerModel.getUsernameDOM(34);
  const localisationElement = photographerModel.getLocalisation();
  const photoElement = photographerModel.getPhoto();
  const taglineElement = photographerModel.getTagline();
  const nameModal = photographerModel.getUsernameDOM(50);

  photographerInfo.appendChild(nameElement);
  photographerInfo.appendChild(localisationElement);
  photographerInfo.appendChild(taglineElement);
  photographerImg.appendChild(photoElement);
  photographerModalName.appendChild(nameModal);
}

async function init() {
  //recuperation url
  const urlParams = new URLSearchParams(window.location.search);

  //recuperation de id contenu dans url
  const currentPhotographerId = parseInt(urlParams.get("id"));
  const photographer = await getPhotographerById(currentPhotographerId);

  //appel a la function displayData avec l'ID
  displayData(photographer);

  //recuperation des tous les medias puis trie les medias correspondant à id du photographe recuperé via page actuel
  let medias = await getMedias();
  medias = medias.filter((media) => media.photographerId === photographer.id);

  //appel à la function pour creer pied de page avec infos prix et likes total
  const informationPhotographer = infosLikeAndPrice(medias, photographer);
  const sectionInformation = document.querySelector(".infos-popularite-price");
  sectionInformation.appendChild(
    informationPhotographer.containerInfosLikeAndPrice()
  );

  // trie media par ordre alphabétique + appel function rendersMedia, met a jours les medias
  const dateTrie = document.querySelector(".li-middle");
  const titreTrie = document.querySelector(".li-end");
  const populaireTrie = document.querySelector(".trie-populaire");

  // trie media par popularite
  function sortByPopularite() {
    medias.sort((a, b) => {
      if (a.likes < b.likes) return 1;
      if (a.likes > b.likes) return -1;
      return 0;
    });
    renderMedias();
  }

  populaireTrie.addEventListener("click", function (event) {
    event.preventDefault();
    sortByPopularite();
  });

  populaireTrie.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sortByPopularite();
    }
  });

  // trie media par titre
  function sortByTitle() {
    medias.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    renderMedias();
  }
  titreTrie.addEventListener("click", function (event) {
    event.preventDefault();
    sortByTitle();
  });

  titreTrie.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sortByTitle();
    }
  });

  // trie media par date
  function sortByDate() {
    medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderMedias();
  }

  dateTrie.addEventListener("click", function (event) {
    event.preventDefault();
    sortByDate();
  });

  dateTrie.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sortByDate();
    }
  });

  //recuperation des prénoms des photographes pour elementPathname
  const photographerFirstName = photographer.name.split(" ")[0];
  const carouselModel = carouselTemplate(medias);

  //appel function dans carousel.js
  function onMediaClick(id) {
    carouselModel.changeCarouselMedia(id);
    carouselModel.openCarousel();
  }

  // creation Media
  function renderMedias() {
    const containerMedias = document.querySelector(".media");
    containerMedias.innerHTML = "";
    medias.forEach((element) => {
      element.pathname = `./assets/medias/${photographerFirstName}`;
      let mediaModel = mediaTemplate(element, onMediaClick);
      const mediaCard = mediaModel.getMediaCardDOM();
      containerMedias.appendChild(mediaCard);
    });
  }

  renderMedias();
}

init();
