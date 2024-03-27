function infosLikeAndPrice(medias, photographer) {
  const { likes } = medias;
  const { price } = photographer;
  function calculateTotalLikes(medias) {
    let totalLikes = 0;
    medias.forEach((media) => {
      totalLikes += media.likes;
    });
    return totalLikes;
  }

  function createHeart() {
    const iconCoeur = document.createElement("i");
    iconCoeur.classList.add(
      "fas",
      "fa-heart",
      "coeur-full",
      "heart-icon-infos"
    );
    iconCoeur.setAttribute("aria-label", "likes au total");
    iconCoeur.alt = "Heart";

    return iconCoeur;
  }

  function createPrice(price) {
    const containerPrice = document.createElement("div");
    containerPrice.className = "price-info";

    const priceTag = document.createElement("p");
    priceTag.textContent = price + " € / jour";
    priceTag.setAttribute("aria-label", "Prix journée: " + price + " €");

    containerPrice.appendChild(priceTag);
    return containerPrice;
  }

  function containerInfosLikeAndPrice() {
    const containerParent = document.createElement("div");
    containerParent.className = "infos-like-price-container";
    const containerLikeHeart = document.createElement("div");
    containerLikeHeart.className = "like-heart-container";
    const totalLikes = calculateTotalLikes(medias);
    const heart = createHeart();
    const totalLikesElement = document.createElement("p");
    totalLikesElement.textContent = totalLikes;
    totalLikesElement.className = "total-like";
    totalLikesElement.setAttribute(
      "aria-label",
      "Total des likes de tous les médias : " + totalLikes
    );

    const dailyPriceElement = createPrice(price);

    containerLikeHeart.appendChild(totalLikesElement);
    containerLikeHeart.setAttribute("tabindex", "0");
    containerLikeHeart.appendChild(heart);

    containerParent.appendChild(containerLikeHeart);
    containerParent.appendChild(dailyPriceElement);

    return containerParent;
  }

  return { containerInfosLikeAndPrice };
}
