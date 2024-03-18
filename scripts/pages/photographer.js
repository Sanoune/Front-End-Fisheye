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

  const parentMediaContainer = document.querySelector(".media");
console.log(photographer.name);
  medias.forEach((element) => {
    if (element.photographerId === photographer.id) {
      const mediaInstance = MediasFactory.createMedia(element);

      const NewElementMedia = mediaInstance.createMedia();

      const link = document.createElement("a");
      link.href = "#";
      const containerMediasInfo = document.createElement("div");
      containerMediasInfo.classList.add("container-infos-media");
      const mediaTitle = document.createElement("p");
      mediaTitle.textContent = element.title;
      const likes = document.createElement("p");
      likes.textContent = element.likes;

      containerMediasInfo.appendChild(likes);
      containerMediasInfo.appendChild(mediaTitle);
      link.appendChild(NewElementMedia);
      parentMediaContainer.appendChild(link);
      link.appendChild(containerMediasInfo);
    }
  });
}

init();







