function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  resetForm();
  document.addEventListener("keydown", onEscapeModal);
  // Ajoutez un écouteur d'événements pour la touche "Tab"
  document.addEventListener("keydown", OnTab);
  const focusableElements = "button, input, textarea";
  const modalId = document.querySelector("#modal-ref");
  const focusableContent = modalId.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  firstFocusableElement.focus();
}

function OnTab(e) {
  // Sélectionnez les éléments focusables de votre modal
  const focusableElements = "button, input, textarea";
  const modalId = document.querySelector("#modal-ref");
  const focusableContent = modalId.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];
  let isTabPressed = e.key === "Tab";

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  }
}

function onEscapeModal(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.removeEventListener("keydown", onEscapeModal);
  document.removeEventListener("keydown", OnTab);
}

const form = document.getElementById("personalized-page-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validate();
});

// Fonction qui crée un élément "span" pour afficher un message d'erreur spécifique et éviter les doublons
function createSpan(errorMessage, id) {
  const parentElement = document.getElementById(id);
  document.getElementById(id).innerHTML = "";
  const span = document.createElement("p");
  span.textContent = errorMessage;
  span.classList.add("error-message");
  parentElement.appendChild(span);
}

// Validation de l'adresse email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// validation nom / prenom
function validateIdentity(identity) {
  const regex = /^[a-zA-Z]{2,}(?:(-|\s)[a-zA-Z]{2,})*$/;
  return regex.test(identity);
}

// reset form
function resetForm() {
  document.getElementById("personalized-page-form").reset();
  const spanIds = [
    "first-name-form",
    "last-name-form",
    "email-form",
    "message",
  ];
  spanIds.forEach((spanId) => {
    document.getElementById(spanId).innerHTML = "";
  });
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });
}

// Fonction de validation du formulaire
function validate() {
  // Récupération des valeurs des champs du formulaire
  const firstName = document.getElementById("first-name-form").value.trim();
  const lastName = document.getElementById("last-name-form").value.trim();
  const email = document.getElementById("email-form").value;
  const messageTextera = document.getElementById("message").value;

  // Vérification de la validité de tous les champs du formulaire
  let correct = true;

  // Validation individuelle des champs
  if (!validateIdentity(firstName)) {
    createSpan(
      "Veuillez entrer un prénom valide et avec plus de 2 caractères.",
      "defaultFirstName"
    );
    correct = false;
  } else {
    document.getElementById("defaultFirstName").innerHTML = "";
  }
  if (!validateIdentity(lastName)) {
    createSpan(
      "Veuillez entrer un nom valide et avec plus de 2 caractères.",
      "defaultLastName"
    );
    correct = false;
  } else {
    document.getElementById("defaultLastName").innerHTML = "";
  }
  if (!validateEmail(email)) {
    createSpan("Veuillez entrer une adresse e-mail valide.", "defaultEmail");
    correct = false;
  } else {
    document.getElementById("defaultEmail").innerHTML = "";
  }
  if (messageTextera === "") {
    createSpan("Veuillez entrer un message.", "defaultMessage");
    correct = false;
  } else {
    document.getElementById("defaultMessage").innerHTML = "";
  }

  // Affichage de la modal de fin du questionnaire si tous les champs sont valides
  if (correct) {
    console.log(
      "Prénom: " +
        firstName +
        "\n" +
        "Nom: " +
        lastName +
        "\n" +
        "Email: " +
        email +
        "\n" +
        "Message: " +
        messageTextera
    );
    closeModal();
  }
}
