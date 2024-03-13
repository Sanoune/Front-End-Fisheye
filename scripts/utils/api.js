async function getData() {
    const response = await fetch("./data/photographers.json");
    if (!response.ok) {
        console.error("Error telechargement");
    }
    const json = await response.json();
    return json;

}

async function getPhotographers() {
    const { photographers } = await getData();
    return photographers;
}

async function getMedias() {
    const { media } = await getData();
    return media;
}

async function getPhotographerById(id) {
    const photographers = await getPhotographers();
    const photographer = photographers.find(photographe => photographe.id === id);
    if (!photographer) {
        console.error("Pas de photographe trouvé.")
    }
    return photographer;
}
