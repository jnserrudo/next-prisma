/* export interface INota{
    id:string,
    title:string,
    content:string,
    createdAt:string,
    updatedAt:string
} */

import {Nota as INota} from '@prisma/client';


//SI BIEN ESTA INTERFACE SE UTILIZABA HASTA ANTES DE AGREGAR EL CREATEDAT Y EL UPDATEDAT
//ahora se trabaja con la nota del schema de prisma, a modo de demotracion que 
//en el caso de que tengamos muchas mas columnas en nuestras tablas, no tengamos 
//que ir creando interfaces super largas que al final terminan teniendo la misma 
//estructura que la tabla de nuestro schema

export type TNota= Omit<INota,'id'|"createdAt"|"updateAt">

//creamos este tipo de nota, que obtiene la misma estructura que la interface de nota
//solo que omite la propiedad de "id", ya que esta la usamos para la creacion de las notas
//como el id no le mandamos a la api, ya que se genera un id por defecto incremental.

//la interface de INota se le agrega el id, ya que para su uso, se esta trabajando
// con las notas que se obtienen, asi de esta manera se las puede enlistar
//y para esto necesitamos el id, para la key en el metodo map a la hora de enlistar


export type TUpdateNote=Partial<TNota>;
/*
    se utiliza al Partial ya que esto consigue que se tenga en este caso
    un tipo de dato que tenga a todos los atributos de en este caso de TNota
    como opcionales 
*/
