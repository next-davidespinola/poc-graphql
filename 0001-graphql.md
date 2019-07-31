# GraphQL

## Resumen

[GraphQL](https://graphql.org/) es un lenguaje de queries propuesto por Facebook que permite definir el formato y la cantidad de datos que se solicitan a una API. Existen implementaciones en la mayoría de lenguajes más usados y permite dar más control al frontal sobre el número de llamadas al servidor que se realizan, la cantidad de campos que viajan en cada una, etc.

## Objetivo

El objetivo de esta prueba de concepto es profundizar en buenas prácticas a la hora de utilizar y escalar GraphQL en producción usando [Typescript](https://www.typescriptlang.org/) tanto en la capa back como en la front y explorar mecanismos de reutilización de tipos. Estando GraphQL en el área de tecnologías a adoptar del radar, este trabajo puede aportar en el camino a considerarlo tecnología core.

Para ello prepararemos una aplicación web que consuma APIs públicas a través de un servidor hecho en NodeJS y GraphQL de forma que podamos valorar propuestas como [TypeGraph](https://typegraphql.ml/) y [Apollo Codegen](https://github.com/apollographql/apollo-tooling#code-generation). En principio serían pruebas locales que se plantearían de forma agnóstica al cloud que a futuro podrían desplegarse en un EC2, App Engine, etc.

## Contexto

GraphQL se desarrolló en Facebook en 2012, se liberó en 2015 y se independizó para formar parte de la Linux Foundation en 2018. Se utiliza ampliamente en [startups y grandes empresas](https://graphql.org/users/).

## Metodología

> Cómo se pretende abordar la prueba de concepto: comparativa, prueba con datos, etc...

### Infraestructura

> Si va a ser necesaria alguna infraestructura o necesidades en la realización de la prueba de concepto para poder desarrollarla: cuentas de AWS, espacio en Drive, etc...

La prueba de concepto se realizará en local, no se desplegará en ningún entorno, por lo que no será necesaria ninguna infraestructura.

### Estimación de costes

> Especificación de los costes asociados a la realización de la prueba de concepto.

Dado que la PoC se realizará en local, en el ordenador de cada miembro, a parte del coste de horas/persona no se va a incurrir en ningún coste asociadp.

### Tareas

> Descripción de cada una de las tareas a abordar en la elaboración de la prueba de concepto.

- Tareas Backend
	- Análisis, instalación y primeras pruebas con GraphQL + Typescript
	- Creación del esqueleto del servidor backend con NodeJS + Express + Apollo
	- Definición del API y de los schemas de los datos
	- Implementación básica (mocks) de los servicios para integración con front
	- Elección de APIs públicas para utilizar como origen de datos
	- ¿Utilizar BB.DD. como otro origen más de datos?
	- Implementación del backend, integrando el/los API/s público/s
	- ¿Incluir autorización en algunos servicios?
	- ¿Acceso por roles?
	- Integración con front y finalización de la PoC

### Dedicación

> Estimación orientativa de los tiempos que se espera dedicar en horas semanales.

De forma general, los miembros de las tribus pueden dedicar un máximo de 2h semanales.

## Autores

> Quién va a llevar a cabo la prueba de concepto.

- @next-davidespinola
- @next-tomasrebollo
- @next-javiergarcia
- @next-josedanielhernandezosorio

## Colaboraciones

> Tribus que colaboran en la prueba de concepto.

- Tribu Front
- Tribu Backend

#### #tag1 #tag2 #tag3
