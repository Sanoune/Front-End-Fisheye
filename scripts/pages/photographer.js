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

  const photographerFirstName = photographer.name.split(" ")[0];

  const carouselModel = carouselTemplate(medias);

  function onMediaClick(id) {
    carouselModel.changeCarouselMedia(id);
  }
  medias.forEach((element) => {
    element.pathname = `./assets/medias/${photographerFirstName}`;
    let mediaModel = mediaTemplate(element, onMediaClick);
    const mediaCard = mediaModel.getMediaCardDOM();
    const containerMedias = document.querySelector(".media");
    containerMedias.appendChild(mediaCard);
  });
}

init();
