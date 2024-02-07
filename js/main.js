const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchMethod = document.getElementById('searchMethod');
const pokemonContainer = document.getElementById('pokemonContainer');
const paginationContainer = document.getElementById('pagination');
const pokemonModal = document.getElementById('pokemonModal');
const modalContent = document.getElementById('modalContent');
const pokemonDetails = document.getElementById('pokemonDetails');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    const method = searchMethod.value;

    if (!searchTerm) {
        fetchPokemons(); // Si el término de búsqueda está vacío, cargar todos los Pokémon
        return; // Salir de la función para evitar la búsqueda con un término de búsqueda vacío
    }

    pokemonContainer.innerHTML = '';

    try {
        if (method === '1') {
            // Búsqueda utilizando promesas
            searchPokemonWithPromises(searchTerm);
        } else if (method === '2') {
            // Búsqueda utilizando async/await
            await searchPokemonWithAsyncAwait(searchTerm);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al buscar Pokémon.');
    }
});

pokemonContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        const pokemonId = card.dataset.id;
        fetchPokemonDetails(pokemonId);
    }
});

function fetchPokemonDetails(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            displayPokemonDetails(data);
            openModal();
        })
        .catch(error => console.error('Error fetching Pokémon details:', error));
}

function displayPokemonDetails(pokemon) {
  // Limpiar el contenido previo del contenedor
  while (pokemonDetails.firstChild) {
      pokemonDetails.removeChild(pokemonDetails.firstChild);
  }

  

  // Crear los botones de navegación
  const prevButton = document.createElement('button');
  prevButton.innerHTML = '&lt;'; // Flecha hacia la izquierda
  prevButton.classList.add('nav-button', 'prev-button');
  prevButton.addEventListener('click', () => navigatePokemon(-1));

  const nextButton = document.createElement('button');
  nextButton.innerHTML = ' &gt;'; // Flecha hacia la derecha
  nextButton.classList.add('nav-button', 'next-button');
  nextButton.addEventListener('click', () => navigatePokemon(1));

  // Crear el botón de cierre (x)
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;'; // Agrega el símbolo x
  closeButton.classList.add('close-button');
  closeButton.addEventListener('click', closeModal);

  // Crear los demás elementos
    const heading = document.createElement('h2');
    const pokemonName = pokemon.name; // Suponiendo que pokemon.name contiene el nombre del Pokémon
    const capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    heading.textContent = capitalizedPokemonName;

  const img = document.createElement('img');
  img.src = `https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`;
  //img.src = `${pokemon.sprites.other['official-artwork'].front_default}`;
  img.alt = pokemon.name;

  const idParagraph = document.createElement('p');
  idParagraph.textContent = `ID: ${pokemon.id}`;

  const weightParagraph = document.createElement('p');
  weightParagraph.textContent = `Peso: ${pokemon.weight/10} kg`;

  const heightParagraph = document.createElement('p');
  heightParagraph.textContent = `Altura: ${pokemon.height/10} m`;

  const abilitiesParagraph = document.createElement('p');
  abilitiesParagraph.textContent = `Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;

  // Agregar los elementos al contenedor
  pokemonDetails.appendChild(closeButton);
  pokemonDetails.appendChild(prevButton);
  pokemonDetails.appendChild(nextButton);
  pokemonDetails.appendChild(heading);
  pokemonDetails.appendChild(img);
  pokemonDetails.appendChild(idParagraph);
  pokemonDetails.appendChild(weightParagraph);
  pokemonDetails.appendChild(heightParagraph);
  pokemonDetails.appendChild(abilitiesParagraph);

  // Agregar la clase para el estilo del modal
  pokemonDetails.classList.add('modal-content');
}

function navigatePokemon(direction) {
  // Obtener el ID del Pokémon actual
  const currentPokemonId = parseInt(pokemonDetails.querySelector('p').textContent.split(' ')[1]);

  // Calcular el ID del próximo Pokémon
  const nextPokemonId = currentPokemonId + direction;

  // Cargar y mostrar el próximo Pokémon
  fetchPokemonDetails(nextPokemonId);
}

// Función para cerrar el modal

function openModal() {
    pokemonModal.style.display = 'block';
}
// Cerrar el modal cuando se hace clic en el botón de cerrar (x)
modalContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        closeModal();
    }
});

function closeModal() {
    pokemonModal.style.display = 'none';
}

function searchPokemonWithPromises(term) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${term}?language=es`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró ningún Pokémon con el término especificado.');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            console.error('Error:', error);
            fetchPokemons();
        });
}

async function searchPokemonWithAsyncAwait(term) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);
    if (!response.ok) {
        throw new Error('No se encontró ningún Pokémon con el término especificado.');
    }
    const data = await response.json();
    displayPokemon(data);
}

function displayPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-3', 'mb-3');
    card.dataset.id = pokemon.id;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const img = document.createElement('img');
    img.classList.add('pokemon-img', 'card-img-top', 'img-fluid');
    //img.src = `https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`;
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    img.style.width = '100%';
    img.alt = pokemon.name;

    const title = document.createElement('h5');
    title.classList.add('card-title');
    const pokemonName = pokemon.name; // Suponiendo que pokemon.name contiene el nombre del Pokémon
    const capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    title.textContent = capitalizedPokemonName;

    const idParagraph = document.createElement('p');
    idParagraph.classList.add('card-text');
    idParagraph.textContent = `ID: ${pokemon.id}`;
    
    const typesParagraph = document.createElement('p');
    typesParagraph.classList.add('card-tipo');
    
    // Obtener los nombres de los tipos del Pokémon y unirlos en una cadena separada por comas
    const types = pokemon.types.map(type => type.type.name);
    
    // Asignar la clase correspondiente a cada tipo de Pokémon
    types.forEach(type => {
      typesParagraph.classList.add(type);
    });
    
    // Establecer el texto del párrafo con los tipos del Pokémon
    typesParagraph.textContent = types.join(', ');
    

    cardBody.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(idParagraph);
    cardBody.appendChild(typesParagraph);
    card.appendChild(cardBody);

    pokemonContainer.appendChild(card);
}

// Función para traducir texto utilizando la API de Google Translate
async function translateText(text, targetLanguage) {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&q=${encodeURIComponent(text)}&target=${targetLanguage}`);
    const data = await response.json();
    return data.data.translations[0].translatedText;
}

function fetchPokemons(page = 1) {
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    pokemonContainer.innerHTML = '';

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetchPokemon(pokemon.name);
            });
            renderPagination(page, Math.ceil(data.count / pageSize));
        });
}

fetchPokemons();

function fetchPokemon(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => displayPokemon(data));
}

function renderPagination(currentPage, totalPages) {
    paginationContainer.innerHTML = '';

    const firstButton = createPaginationButton('Inicio', 1);
    const prevButton = createPaginationButton('Anterior', currentPage - 1);
    const nextButton = createPaginationButton('Siguiente', currentPage + 1);
    const lastButton = createPaginationButton('Fin', totalPages);

    if (currentPage === 1) {
        prevButton.disabled = true;
    }
    if (currentPage === totalPages) {
        nextButton.disabled = true;
    }

    paginationContainer.appendChild(firstButton);
    paginationContainer.appendChild(prevButton);

    const pagesToShow = calculatePagesToShow(currentPage, totalPages);
    pagesToShow.forEach(page => {
        const pageButton = createPaginationButton(page, page);
        if (currentPage === page) {
            pageButton.classList.add('active');
        }
        paginationContainer.appendChild(pageButton);
    });

    paginationContainer.appendChild(nextButton);
    paginationContainer.appendChild(lastButton);
}

function createPaginationButton(text, page) {
    const button = document.createElement('button');
    button.textContent = text;
    button.id = 'btnP';
    button.classList.add('btn', 'btn-primary', 'waves-effect', 'waves-light');
    button.addEventListener('click', () => {
        fetchPokemons(page);
    });
    return button;
}

function calculatePagesToShow(currentPage, totalPages) {
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const pagesToShow = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i < right)) {
            pagesToShow.push(i);
        }
    }
    return pagesToShow;
}

const navbarBrandLink = document.querySelector('.navbar-brand');

// Agregar un manejador de eventos al hacer clic en el enlace
navbarBrandLink.addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que el enlace cambie de página
  
  // Llamar a la función fetchPokemons()
  fetchPokemons();
});
