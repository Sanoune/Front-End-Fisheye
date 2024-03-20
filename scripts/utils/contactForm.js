function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}


function toggleDropdown() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const buttonIcon = document.querySelector(".fleche");

  // Toggle (basculer) l'attribut 'hidden' du menu
  dropdownMenu.hidden = !dropdownMenu.hidden;

  // Changer l'icône du bouton en fonction de l'état du menu
  if (dropdownMenu.hidden) {
    // Si le menu est masqué, utilisez l'icône de flèche vers le bas
    buttonIcon.src = "./assets/icons/fleche-vers-le-bas.png";
  } else {
    // Sinon, utilisez l'icône de flèche vers le haut
    buttonIcon.src = "./assets/icons/fleche-vers-le-haut.png";
  }
}

//verification validation form 
