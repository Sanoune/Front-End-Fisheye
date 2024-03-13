
//function creation des carte photographe : photos et nom
function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const links = document.createElement('a');
        const img = document.createElement( 'img' );
       links.setAttribute('aria-label', 'Liens pour aller sur la page du photographe ' + name);
       img.setAttribute('src', picture);
       img.setAttribute('alt', 'Photo du photographe ' + name);
       img.setAttribute('aria-label', 'Photo du photographe ' + name);

    

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(links);
        links.appendChild(img);
        links.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}


//function creation informations photographe ville , pays, tagline, prix journée
function getPhotographerInfoDOM(photographer) {
    const photographerInfoDiv = document.createElement("div");
    photographerInfoDiv.className = "box-infos-photographer";
 
    const cityElement = document.createElement("p");
    cityElement.textContent = `${photographer.city}/${photographer.country}`;
    cityElement.className = "city-photographer";
    photographerInfoDiv.appendChild(cityElement);
   
    const textElement = document.createElement("p");
    textElement.textContent = photographer.tagline;
    photographerInfoDiv.appendChild(textElement);
    
    const priceElement = document.createElement("p");
    priceElement.textContent = `${photographer.price}€/jour`;
    priceElement.className = "price-photographer";
    photographerInfoDiv.appendChild(priceElement);
    
    return photographerInfoDiv;
}
