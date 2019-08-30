# PoC GraphQL

El objetivo de este repositorio es coordinarnos para la realización de la PoC. Podemos proponer la forma de trabajar que consideremos más apropiada y hablar los temas relacionados a través de [las issues](https://github.com/next-davidespinola/poc-graphql/issues).


## Backend

El backend está implementado en TypeScript usando Node.js, GraphQL y Apollo Express server.
La implementación consiste en un "wrapper" de una API REST pública, ya que el objetivo es
probar la tecnología GraphQL y cómo ésta puede ser utilizada para construir APIs que puedan
integrarse fácilmente con distintos orígenes de datos.

### Instalación y configuración

La primera vez será necesario instalar todas las dependencias.

> npm install

### Iniciar servidor backend

En el fichero package.json se pueden ver los distintos comandos de que acepta el backend para su ejecución.
Para arrancar el backend en modo debug, el cual utiliza *nodemon* para monitorizar los cambios, basta con ejecutar lo siguiente.

> npm run start:dev

Una vez hecho esto, el servidor estará escuchando en [http://localhost:3000/graphql](http://localhost:3000/graphql) por lo que si se abre un browser con esa URL, se accederá al *Playground*, aplicación web que levanta el servidor Apollo para probar la API GraphQL.

### Documentación de la API GraphQL

Se ha decidido utilizar como origen de datos la API pública de [The Movie DB](https://www.themoviedb.org/documentation/api?language=es-ES) ya que contiene bastante información lo suficientemente relacionada entre sí como para utilizarla en esta PoC.

A continuación se describen brevemente los *schemas*, las *queries* y las *mutations* disponibles en la API GraphQL implementada en el backend.

#### Schemas

```
type Movie {
  id: Int!
  title: String!
  date: DateTime
  director: Person!
  cast: [Person!]!
}

type Person {
  id: Int!
  name: String!
  gender: String
  filmography: [Movie!]!
}
```

**Movie**


**Person**


#### Queries

**movies**

**movie**

**persons**

**person**

#### Mutations

**rateMovie**

**createList**

**removeList**

**addMovieToList**

**removeMovieFromList**
