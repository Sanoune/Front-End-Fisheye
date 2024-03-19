// Initialisez l'index actuel à 0 (première image)
let currentIndex = 0;

const prevButton = document.querySelector(".prev");
const  nextButton = document.querySelector(".next")




// Gestionnaire d'événement pour le clic sur le bouton "Précédent"
prevButton.addEventListener('click', function() {
  // Décrémentez l'index pour afficher la photo précédente
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  displayImage();
});

// Gestionnaire d'événement pour le clic sur le bouton "Suivant"
nextButton.addEventListener('click', function() {
  // Incrémentez l'index pour afficher la photo suivante
  currentIndex = (currentIndex + 1) % images.length;
  displayImage();
});

// Fonction pour afficher l'image correspondant à l'index actuel
function displayImage(pathname, image, title) {
    const imageElementCarousel = document.getElementById('image-carousel');
  
    // Définir le gestionnaire d'événement pour le clic sur le lien
    link.addEventListener('click', function() {
      const imagePath = `${pathname}/${image}`;
      imageElementCarousel.src = imagePath;
      imageElementCarousel.alt = title;
      imageElementCarousel.setAttribute('aria-label', "Description de l'image: " + title);
    });
  
    // Afficher l'image passée en argument
    const imagePath = `${pathname}/${image}`;
    imageElementCarousel.src = imagePath;
    imageElementCarousel.alt = title;
    imageElementCarousel.setAttribute('aria-label', "Description de l'image: " + title);
  }
  
