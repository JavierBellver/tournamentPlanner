# tournamentPlanner
[![Apiary Documentation](https://img.shields.io/badge/Apiary-Documented-blue.svg)](http://docs.tournamentplanner.apiary.io/)

Web Rest API for the organization of tournament. Currently on an early build. Built using node.js with express 
and mocha for testing. 

## Characteristics currently implemented:

CRUD Tournaments
CRUD Organizador
CR Competitors. You can add new competitors to already existing tournaments and you can retrieve the competitors that have been added to the tournament.

## Práctica 2

Añadidas vista de Login, Lista de torneos y lista de organizadores.

Tanto la vista de login como la lista de torneos están realizados con react, el servidor acepta un usuario mockeado en el servidor de login: usuario y contraseña: password. Esto es así porque esta vista emula el backoffice de la aplicación. En caso de logearse con esto datos se devuelve un token json. 

La lista de torneos esta realizada utilizando React mientras que la lista de organizadores esta realizada mediante jQuery y Handlebars
