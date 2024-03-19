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

  const medias = await getMedias();
  const photographerFirstName = photographer.name.split(" ")[0];

  const parentMediaContainer = document.querySelector(".media");

  medias.forEach((element) => {
    if (element.photographerId === photographer.id) {
      element.pathname = `./assets/medias/${photographerFirstName}`;
      let returnResultParentCardMedia = creatMediaCards(element)
      parentMediaContainer.appendChild(returnResultParentCardMedia);
    }
  });
}

init();
