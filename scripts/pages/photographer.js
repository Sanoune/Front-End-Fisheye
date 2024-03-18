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
  console.log(currentPhotographerId)
  const photographer = await getPhotographerById(currentPhotographerId);
  console.log(photographer)
  displayData(photographer);

  const dataMedias = await getPhotographers ()
  const mediaInstance = MediasFactory.createMedia(dataMedias);

}

init();


