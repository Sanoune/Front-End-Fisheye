//Page index
//function photographerTemplate return getUserCardDOM et getPhotographerInfoDOM et d'autres functions pour creer elements double

function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUsernameDOM(fontsize) {
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.style.fontSize = `${fontsize}px`;
    h2.setAttribute("aria-label", "Nom du photographe : " + name);
    return h2;
  }

  function getPhoto() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "Photo du photographe " + name);
    img.setAttribute("aria-label", "Photo du photographe " + name);
    return img;
  }

  function getLink() {
    const links = document.createElement("a");
    links.href = `./photographer.html?id=${id}`;
    links.addEventListener("click", () => {
      window.location.href = `./photographer.html?id=${id}`;
    });
    links.setAttribute(
      "aria-label",
      "Liens pour aller sur la page du photographe " +
        name +
        " le photographe vie à " +
        city +
        " son expression est " +
        tagline +
        " son tarife journée est de " +
        price +
        " euros "
    );
    return links;
  }

  function getLocalisation() {
    const cityElement = document.createElement("p");
    cityElement.textContent = `${city}/${country}`;
    cityElement.className = "city-photographer";
    cityElement.setAttribute(
      "aria-label",
      "Localisation : " + city + ", " + country
    );
    return cityElement;
  }

  function getTagline() {
    const textElement = document.createElement("p");
    textElement.textContent = tagline;
    textElement.setAttribute("aria-label", "Tagline : " + tagline);
    return textElement;
  }

  function getUserCardDOM() {
    const article = document.createElement("article");
    const usernameDOM = getUsernameDOM(36);
    const img = getPhoto();
    const links = getLink();
    links.appendChild(img);
    links.appendChild(usernameDOM);
    article.appendChild(links);
    return article;
  }

  function getPhotographerInfoDOM() {
    const photographerInfoDiv = document.createElement("div");
    photographerInfoDiv.className = "home-infos-photographer";

    const cityElement = getLocalisation();
    const textElement = getTagline();

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`;
    priceElement.className = "price-photographer";
    priceElement.setAttribute(
      "aria-label",
      "Tarif du photographe : " + price + " euros par jour"
    );

    photographerInfoDiv.appendChild(cityElement);
    photographerInfoDiv.appendChild(textElement);
    photographerInfoDiv.appendChild(priceElement);

    return photographerInfoDiv;
  }
  return {
    picture,
    getUserCardDOM,
    getPhotographerInfoDOM,
    getUsernameDOM,
    getPhoto,
    getTagline,
    getLocalisation,
  };
}
