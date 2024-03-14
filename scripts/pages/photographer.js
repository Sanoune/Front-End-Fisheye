async function displayData(photographers) {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPhotographerId = urlParams.get("id");

  const photographerInfo = document.querySelector(".infos-photographer");
  const photographerImg = document.querySelector(".photographer-img");

  photographers.forEach((photographer) => {
    if (photographer.id === parseInt(currentPhotographerId)) {
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
  });
}

async function init() {
  const photographers = await getPhotographers();

  displayData(photographers);
}

init();
