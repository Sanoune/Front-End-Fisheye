async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const photographerInformation = photographerModel.getPhotographerInfoDOM();
    console.log(photographerModel.getPhotographerInfoDOM())
    const userCardDOM = photographerModel.getUserCardDOM();
    console.log(photographerModel.getUserCardDOM())
    photographersSection.appendChild(userCardDOM);
    userCardDOM.appendChild(photographerInformation);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  console.log("1ere etape")
  displayData(photographers);
}

init();
console.log("2eme etape")
