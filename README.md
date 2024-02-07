# T4.1DevDoc UX UI Accesibilidad Inclusividad 

[Enlace al Proyecto](https://miguelcorreadev.github.io/miguelcorrea/index.html)
## Tabla de contenidos
1. [Leyes UX](#Leyes_ux)
2. [Tecnologías](#tecnologias)
3. [Javascript](#javascript)
4. [Navegación](#navegacion)

## Leyes UX 
***
En este proyecto se han aplicado las siguientes __leyes UX__: 
* __Ley de Fitts__: establece que cuanto más grande sea un objeto y más cerca esté de nosotros, más fácil será alcanzarlo, influyó en la convención de hacer que los botones interactivos sean más grandes.

<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/miguelcorrea/DOC/imagenes/Fitts.png" alt="Fitts" width="600px">
    </p>
</div>


* __Ley de Jakob__: usar patrones familiares en el diseño para facilitar la experiencia del usuario, uso de un menú sencillo y web minimalista.
* __Efecto de estética-usabilidad__: Interfaz atractiva con imagen visual.
* __Ley de Postel__: En el formulario de contacto se avisa mediante un alert, si se introduce una estructura de la dirección de email incorrecta o si falta algún campo.
* __Umbral de Doherty__: En la página de inicio aparece una animación que nos hace percibir que se esta cargando.
<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/miguelcorrea/DOC/imagenes/Doherty.png" alt="Doherty" width="200px">
    </p>
</div>

* __Principio de la Navaja de Occam__: Diseño limpio y minimalista, se puede observar que existe un flujo de navegación claro, el usuario siempre sabe donde esta, el menu queda sobreado en azul en la sección correspondiente (Se puede observar en la captura de la Ley de Fitts).


## Tecnologias
***
En este proyecto se ha utilizado las siguientes tecnologías:
* JavaScript
* HTML
* CSS
* Bootstrap

## Javascript
***
### Import - Export
La parte de Javascript consta inicialmente de dos archivos JS el primero es __scripts.js__, donde encontraremos prácticamente todo el código utilizado en la web y donde se realiza el __import__ del segundo archivo llamado __Empresa.js__, en el encontraremos una clase en JS exportada con el nombre de Empresa, en ella hay un constructor donde le pasamos por parámetros el id, nombre, imagen, url, y fechas, a continuación tenemos los métodos __get_ para recuperar cada uno de los datos.
```
 export class Empresa{
    constructor(id, nombre, imagen, url, fechas){
        this._id = id;
        this._nombre = nombre;
        this._imagen = imagen;
        this._url = url;
        this._fechas = fechas
    }
    getId(){
        return this._id;
    }
    ...
```
```
import { Empresa } from "./Empresa.js";
```
En cada uno de los  archivos HTML cargamos/llamamos a __scripts.js__ de la siguiente manera, con type="module".
```
<script type="module" src="js/scripts.js"></script>
```
### Función Arrow
Se utiliza para retrasar la carga del contenido del index.html durante 3 segundos para similar que esta cargando el contenido.
```
setTimeout(() => {
                mostrarTextoIndex();
            }, 3000);
```
### Instancia de objetos
En la página de __experiencia.html__ he instanciado en este caso 3 objetos, que serian las 3 empresas donde he trabajado, lo bueno de hacerlo de esta forma es que si crece la cantidad de empresas, con instanciarla ya se generará automaticamte en la web.  <br>
__Nota__: en la captura de la Ley de Fitts se puede observar las 3 empresas creadas.
```
empresa1 = new Empresa("1", "Square Concept (Malta)", "./images/squareConcept.png", "http://www.squareconcept.com/", "09/2006 -11/2006");

empresa2 = new Empresa("2", "Informática Scape", "./images/LOGO SCAPE.png", "https://scapeinformatica.com/", "01/2007 - 06/2012");

empresa3 = new Empresa("3", "InforServer S.L.", "./images/is.png", "http://www.inforserver.es/", "01/2007 - 06/2012");
``` 
Inicialmente se ha intentado pasar los datos de un archivo JSON, cargarlos en un array o lista y recorriendolo ir realizando la instancia de cada objeto empresa, pero por varios motivos no se pudo realizar en este punto, queda para proximas mejoras.

La 3 variables de empresa se han tenido que declarar con let y de una forma global (aunque no es recomendado), para poder utilizarlas en distintas funciones independientes.
```
let empresa1;
let empresa2;
let empresa3;
```

Todos los elementos html de las empresas se ha creado mediante elementos y dinamicamente dentro de un bucle for, desde el código JS, este es un pequeño fragmento:

```
// Crea el contenedor principal
const empresaDiv = document.createElement('div');
empresaDiv.classList.add('col-sm-3', 'experiencia');
empresaDiv.addEventListener('mouseover',() => mostrarDescripcion(i+ 1));

empresaDiv.addEventListener('mouseout', ocultarDescripcion);

// Crea el enlace
const empresaLink = document.createElement('a');
empresaLink.href = empresa.getUrl();
empresaLink.id = `empresa${i + 1}`;
empresaLink.target = "_blank"; 

// Crea la imagen
const empresaImg = document.createElement('img');
empresaImg.src = empresa.getImagen();
empresaImg.alt = empresa.getNombre();
```
## Navegacion
***
En la página web hay dos tipos de navegaciones, una para pc o pantallas de una mayor resolución donde utilizaremos los distintos enlaces que se distribuyen de izquierda a derecha para volver al index presionaremos el primero por la izquierda y los otros presentan el nombre de cada sección  

<div>
    <p style = 'text-align:center;'>
    <img src="https://miguelcorreadev.github.io/miguelcorrea/DOC/imagenes/nav.png" alt="Nav" width="700px">
    </p>
</div>

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