
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const year = document.getElementById("year");
const director = document.getElementById("director");
const character = document.getElementById("character");
const quote = document.getElementById("quote");
const timestamp = document.getElementById("timestamp");
const duration = document.getElementById("duration");
const video = document.getElementById("video");
const button = document.getElementById("new-film");
const status = document.getElementById("status");

async function getNewFilm() {
    button.disabled = true;
    status.textContent = "Laster et nytt filmøyeblikk...";

    try {
        const response = await fetch(
            "https://whoa.onrender.com/whoas/random"
        );

        if (!response.ok) {
            throw new Error("Kunne ikke hente data fra API-et.");
        }

        const data = await response.json();

        // API-et returnerer en array.
        // Vi bruker det første objektet.
        const film = Array.isArray(data) ? data[0] : data;

        if (!film) {
            throw new Error("Fant ingen filmdata.");
        }

        title.textContent = film.movie ?? "Ukjent film";
        year.textContent = film.year ?? "Ukjent";
        director.textContent = film.director ?? "Ukjent";
        character.textContent = film.character ?? "Ukjent";
        quote.textContent = film.full_line ?? "Ingen sitat";
        timestamp.textContent = film.timestamp ?? "Ukjent";
        duration.textContent = film.movie_duration ?? "Ukjent";

        poster.src = film.poster ?? "";
        poster.alt = "Filmplakat for " + (film.movie ?? "ukjent film");

        // Velg videoklipp i 720p eller 480p.
        const videoUrl = film.video?.["720p"] || film.video?.["480p"];

        video.pause();
        video.removeAttribute("src");
        video.load();

        if (videoUrl) {
            video.src = videoUrl;
            video.load();
        }

        status.textContent = "Filmøyeblikket er klart!";

    } catch (error) {
        console.error(error);
        status.textContent =
            "Kunne ikke hente filmen. Prøv igjen.";
    } finally {
        button.disabled = false;
    }
}

button.addEventListener("click", getNewFilm);

// Hent en film når nettsiden åpnes.
getNewFilm();
