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

<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/pokedev.png" alt="Fitts" width="600px">
    </p>
</div>

El funcionamiento de la búsqueda es sencillo, en el campo input podremos buscar por el nombre del Pokemon o por su id, la siguiente opción es buscar por __Promises__ o __Async/Await__ y a continuación haremos clic en el botón de buscar.

<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/nav_busqueda.png" alt="Fitts" width="600px">
    </p>
</div>

Cuando la búsqueda es correcta, nos mostrará en pantalla únicamente ese Pokemon, si queremos que vuelvan a apareces todos podemos hacer clic en el logo de __PokeDev__ en la parte superior izquierda o realizar una __búsqueda vacía__.
<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/busqueda.png" alt="Fitts" width="600px">
    </p>
</div>

Si hacemos clic sobre cualquier Pokemon, se nos abrirá una pequeña ventana modal en el centro de la pantalla con más información sobre ese Pokemon y en la gran mayoría se sustituye la imagen por un gif en movimiento para dar una sensación de interactividad.

Esta programado que si de algún Pokemon no tuviera gif, que lo sustituya por la misma imagen que tiene en la ventana principal.

<div>
    <p style = 'text-align:center;'>
    <img src="https://projectpokemon.org/images/normal-sprite/charmander.gif" alt="Fitts" width="150px">
    </p>
</div>

En los modales encontraremos dos botones verdes para movernos entre los pokemons próximos y un tercer botón rojo para cerrarlo.

<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/modal.png" alt="Fitts" width="600px">
    </p>
</div>

En la parte inferior de cada página encontraremos un menú de paginación para poder ir avanzando y ver los cientos de Pokemons que hay cargados.

<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/pokedev/Doc/images/paginacion.png" alt="Fitts" width="600px">
    </p>
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

Por otro lado, cuando pasamos a pantallas más pequeñas o con menos resolución el menú anterior se adapta a un menú de hamburguesa donde tendremos un pequeño icono con 3 rallas horizontales que al presionarlo se nos desplegará  el menú hacia debajo de forma vertical.

<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/miguelcorrea/DOC/imagenes/nav-h.png" alt="Nav" width="300px">
    </p>
</div>




Para no repetir código en cada página de la web e cargado el código HTML en la carga de JS y lo inserto con la función __outerHTML__, lo que hago es realizar una querySelector del id cabecera y sobrescribo el __Div__ vacío que hay en cada archivo por el menú de navegación, no es la forma más segura de hacerlo, lo ideal sería realizar la creación de cada elemento como se hizo con las empresas, pero así he probado distintas formas de cargar código y de la otra forma me ha dado luego más problemas con el __CSS__. (Pequeño fragmento de código)

```
const container = document.querySelector(".cabecera");
container.outerHTML="<a class='navbar-brand' href='index.html'><img id='imgLogo' src='images/fotoMC.png' alt='FotoPerfil' /> Miguel Correa </a>"+

"<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>"+
                "<span class='navbar-toggler-icon'></span></button>"+
```

## WAVE
***
Se ha examinado minuciosamente con la extensión de WAVE los posibles errores de accesibilidad y actualmente no tiene ninguno, salvo uno de contraste en el botón de enviar del formulario de contacto.

## Nota aclarativa
***
La validación del formulario actualmente no esta funcionando, he revisado y al realizar la configuración previa para import/Export de la clase, ha dejado de funcionar, en pruebas anteriores si estaba incompleto algún campo, saltaba un error y si la dirección  de correo estaba mal estructurada tambien avisaba.