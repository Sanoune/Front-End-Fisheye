// function qui appels d'autres functions pour creer les éléments dynamiquement pour la page photographer via
async function displayData(photographer) {
  const photographerInfo = document.querySelector(".infos-photographer");
  const photographerImg = document.querySelector(".photographer-img");

  const photographerModel = photographerTemplate(photographer);

  const nameElement = photographerModel.getUsernameDOM(34);
  const localisationElement = photographerModel.getLocalisation();
  const photoElement = photographerModel.getPhoto();
  const taglineElement = photographerModel.getTagline();

  photographerInfo.appendChild(nameElement);
  photographerInfo.appendChild(localisationElement);
  photographerInfo.appendChild(taglineElement);
  photographerImg.appendChild(photoElement);
}

//function recupere l'ID de url dans une const et récupere les infos des photographes correspondant à ID
// Et appel la function displayData.
async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPhotographerId = parseInt(urlParams.get("id"));
  const photographer = await getPhotographerById(currentPhotographerId);
  displayData(photographer);

  let medias = await getMedias();
  medias = medias.filter((media) => media.photographerId === photographer.id);
  const informationPhotographer = infosLikeAndPrice(medias, photographer);
  const sectionInformation = document.querySelector(".infos-populartie-price");
  sectionInformation.appendChild(
    informationPhotographer.containerInfosLikeAndPrice()
  );

  const titreTrie = document.querySelector(".li-end");

  titreTrie.addEventListener("click", function (event) {
    event.preventDefault();
    medias.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    renderMedias();
  });


  const dateTrie = document.querySelector(".li-middle");


  dateTrie.addEventListener("click", function (event) {
    event.preventDefault();
    medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(medias)
    renderMedias();
    console.log(medias.likes)
  });

  
  const photographerFirstName = photographer.name.split(" ")[0];
  const carouselModel = carouselTemplate(medias);

  function onMediaClick(id) {
    carouselModel.changeCarouselMedia(id);
  }

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
