const container = document.getElementById('list-container');
const botones = document.querySelectorAll('#filtros button');

let allCharacters = [];

//carga de personajes

async function getCharacters() {
    console.log("Solicitando datos...");

    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();

        // guardo solo los que tienen imagen y limito a 25
        allCharacters = data
            .filter(c => c.image !== "")
            .slice(0, 25);

        renderCharacters(allCharacters);

    } catch (error) {
        console.error("Error cargando la API:", error);
    }
}

//renderizar lista

function renderCharacters(characters) {
    container.innerHTML = ""; // Limpiar lista

    characters.forEach(char => {
        createRow(char);
    });
}

//creación de cada tarjeta

function createRow(char) {
    const row = document.createElement('div');
    row.className = 'row-card';

    row.innerHTML = `
        <img src="${char.image}" alt="${char.name}">
        <div class="info">
            <h2>${char.name}</h2>
            <p><b>Casa:</b> ${char.house || 'Ninguna'}</p>
            <p><b>Actor:</b> ${char.actor}</p>
        </div>
    `;

    row.addEventListener('click', () => {
        window.location.href = `detalles.html?name=${encodeURIComponent(char.name)}`;
    });

    container.appendChild(row);
}

//filtros de casa


botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const casa = boton.dataset.house;

        if (casa === "all") {
            renderCharacters(allCharacters);
        }
        else if (casa === "none") {
            const sinCasa = allCharacters.filter(c => !c.house);
            renderCharacters(sinCasa);
        }
        else {
            const filtrados = allCharacters.filter(c => c.house === casa);
            renderCharacters(filtrados);
        }
    });
});


getCharacters();

