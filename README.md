# T4.2Dev Promesas y Async/Await

[Enlace al Proyecto PokeDev](https://miguelcorreadev.github.io/pokedev/)
## Tabla de contenidos
1. [Proyecto](#proyecto)
2. [Promises](#promises)
3. [Async/Await](#async/await)
4. [Errores usando try/catch/throw/error](#errores_usando_try/catch/throw/error)
5. [Funciones arrow](#funciones_arrow)


## Proyecto 
***
 __PokeDev__ 

Este proyecto se realiza como ejercicio para manejar el asincronismo y trabajar con operaciones que llevan tiempo, como llamar a una API. 

Se trata de una Web que realiza las peticiones a la PokeApi, de esta se sacan los datos de cada Pokemon, inicialmente las imágenes se cogían también de también, pero no me convencia la calidad y he buscado otra opción en: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png, las cuales tienen mucha más calidad.

<div style="margin: 0 auto; width: 600px;">
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/pokedev.png" alt="Fitts" width="600px">
</div>

El funcionamiento de la búsqueda es sencillo, en el campo input podremos buscar por el nombre del Pokemon o por su id, la siguiente opción es buscar por __Promises__ o __Async/Await__ y a continuación haremos clic en el botón de buscar.

<div style="margin: 0 auto; width: 600px;">
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/nav_busqueda.png" alt="Fitts" width="600px">
</div>

Cuando la búsqueda es correcta, nos mostrará en pantalla únicamente ese Pokemon, si queremos que vuelvan a apareces todos podemos hacer clic en el logo de __PokeDev__ en la parte superior izquierda o realizar una __búsqueda vacía__.

<div style="margin: 0 auto; width: 600px;">
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/busqueda.png" alt="Fitts" width="600px">
</div>

Si hacemos clic sobre cualquier Pokemon, se nos abrirá una pequeña ventana modal en el centro de la pantalla con más información sobre ese Pokemon y en la gran mayoría se sustituye la imagen por un gif en movimiento para dar una sensación de interactividad.

Esta programado que si de algún Pokemon no tuviera gif, que lo sustituya por la misma imagen que tiene en la ventana principal.

<divstyle="margin: 0 auto;">
    <img src="https://projectpokemon.org/images/normal-sprite/charmander.gif" alt="Fitts" width="150px">
</div>

En los modales encontraremos dos botones verdes para movernos entre los pokemons próximos y un tercer botón rojo para cerrarlo.

<div style="margin: 0 auto; width: 600px;">
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/modal.png" alt="Fitts" width="600px">
</div>

En la parte inferior de cada página encontraremos un menú de paginación para poder ir avanzando y ver los cientos de Pokemons que hay cargados.

<div style="margin: 0 auto; width: 600px;">
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/paginacion.png" alt="Fitts" width="600px">
</div>


## Promises 
***
Promesa en JavaScript, es un objeto que sirve para reservar el resultado de una operación futura.

Este resultado llega a través de una operación asíncrona como puede ser una petición HTTP o una lectura de ficheros, que son operaciones no instantáneas, que requieren un tiempo, aunque sea pequeño, para ejecutarse y finalizar.

Este sería el método que utilizo para realizar la busqueda de lo que se escribe en el input del formulario que se pasa a la función como parámetro

```
function searchPokemonWithPromises(term) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${term}?language=es`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró ningún Pokémon con el nombre o id especificado.');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            alert('Hubo un error al buscar el Pokémon.');
            fetchPokemons();
        });
}
```



## Async/Await
***
En JavaScript, las __funciones asíncronas__ son muy importantes debido a la naturaleza de un solo subproceso de JavaScript. Con la ayuda de funciones asíncronas, el bucle de eventos de JavaScript puede encargarse de otras cosas cuando la función solicita algún otro recurso.

La palabra clave async se añade a las funciones para que devuelvan una promesa en lugar de un valor directamente y con el bloque __try catch__ podemos manejar los errores.

```
async function searchPokemonWithAsyncAwait(term) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);
        if (!response.ok) {
            throw new Error('No se encontró ningún Pokémon con el nombre o id especificado.');
        }
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        alert('Hubo un error al buscar el Pokémon.');
        fetchPokemons();
    }
}
```

## Errores usando try/catch/throw/error
***
Como se puede apreciar el las funciones anteriores utilizamos try-Catch para manejar los posibles errores.

## Funciones arrow
***
Se puede observar a lo largo del código de fichero main.js la utilización de funcionses arrow => lo que nos va a permitir definir una función de manera compacta y tendremos un código más conciso y limpio.
``` 
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
```
``` 
pokemonContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        const pokemonId = card.dataset.id;
        fetchPokemonDetails(pokemonId);
    }
});
``` 

