/*
 * Les fonctions dans ce fichier sont async car elles ont besoin d'attendre la réponse de fetch du fichier json
 * On utilise await pour attendre cette réponse et cela se propage aux fonctions qui appelle celle-ci
 */

// récuperation données depuis photograpers.json

async function getData() {
  const response = await fetch("./data/photographers.json");
  if (!response.ok) {
    console.error("Error telechargement");
    return {};
  }
 
  // return données en json
  const json = await response.json();
  return json;
}

//function récupére json phootographers
async function getPhotographers() {
  const { photographers } = await getData();
  return photographers;
}

// function récupére json media
async function getMedias() {
  const { media } = await getData();
  return media;
}

//function récupére json photographer via leurs ID
async function getPhotographerById(id) {
  const photographers = await getPhotographers();
  const photographer = photographers.find(
    (photographe) => photographe.id === id
  );
  if (!photographer) {
    console.error("Pas de photographe trouvé.");
  }
  return photographer;
}
