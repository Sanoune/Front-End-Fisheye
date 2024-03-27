//ouvrire la liste de trie
function toggleDropdown() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const buttonIcon = document.querySelector(".fleche");
  const selectedOption = document.getElementById("selected-option");
  const liElements = dropdownMenu.querySelectorAll("li");
  const buttonUl = document.getElementById("dropdownButton")


  if (dropdownMenu.style.display === "block") {
    dropdownMenu.style.display = "none";
    buttonUl.setAttribute("aria-expanded", "false");
    buttonIcon.src = "./assets/icons/fleche-vers-le-bas.png";
  } else {
    dropdownMenu.style.display = "block";
    buttonUl.setAttribute("aria-expanded", "true");
    buttonIcon.src = "./assets/icons/fleche-vers-le-haut.png";
  }
}

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

  const dateTrie = document.querySelector("#trie-date");
  const titreTrie = document.querySelector("#trie-titre");
  const populaireTrie = document.querySelector("#trie-populaire");

  // trie media par titre
  function sortByTitle() {
    reFreshDropDownListe(titreTrie);
    medias.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    renderMedias();
  }
  titreTrie.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
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
    reFreshDropDownListe(dateTrie);
    medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderMedias();
  }

  // function affiche masque element filter
  const tries = [dateTrie, titreTrie, populaireTrie];
  function reFreshDropDownListe(hiddenElement) {
    const buttonTop = document.getElementById("selected-option");
    if (hiddenElement === dateTrie) {
      buttonTop.textContent = "Date";
      
    } else if (hiddenElement === titreTrie) {
      buttonTop.textContent = "Titre";
    } else if (hiddenElement === populaireTrie) {
      buttonTop.textContent = "Populaire";
    }

    tries.forEach((trie) => {
      if (trie === hiddenElement) {
        trie.style.display = "none";
      } else {
        trie.style.display = "block";
      }
    });
  }

  dateTrie.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
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

  // trie media par popularite  + appel la fonction renderMedias pour afficher en 1er les medias par popularite
  function sortByPopularite() {
    reFreshDropDownListe(populaireTrie);
    medias.sort((a, b) => {
      if (a.likes < b.likes) return 1;
      if (a.likes > b.likes) return -1;
      return 0;
    });
    renderMedias();
  }
  sortByPopularite();

  populaireTrie.addEventListener("click", function (event) {
    sortByPopularite();
  });

  populaireTrie.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sortByPopularite();
    }
  });

  //appel function dans carousel.js pour mettre a jour le media actuel dans carousel
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
