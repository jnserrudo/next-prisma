"use client";
import React, { createContext, useState } from "react";

import { TNota,TUpdateNote /* INota */ } from "@/interfaces/Note";
import {Nota as INota} from '@prisma/client';
export const NoteContext = createContext<{
  notas: INota[];
  loadNotas: () => Promise<void>;
  crearNotas: (nota: TNota) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  updatedNote: (id:number,nota: TUpdateNote) => Promise<void>;
  selectedNote: INota| null ;
  setSelectedNote :(note:INota|null)=>void ;
  bandDropNote:boolean;
  setBandDropNote:(value:boolean)=>void;
}>({
  notas: [],
  loadNotas: async () => {},
  crearNotas: async (nota: TNota) => {},
  deleteNote: async (id: number) => {},
  updatedNote:async (id:number,nota: TUpdateNote) => {},
  selectedNote:  null ,
  setSelectedNote :(note:INota|null)=>{},
  bandDropNote:false,
  setBandDropNote:(value:boolean)=>{}

});
/**
 * 
    lo que esta entre < > es el tipo de valor que se espera que el contexto tenga
    el objeto que se pasa como parametro, es el objeto que define los valores por
    defecto para el contexto, esto sirve para los casos en los cuales no se le 
    creeo un proveedor al contexto y se lo quiere usar al contexto sin un proveedor
    , por lo que entiendo esto pasa para evitar algun tipo de error en el caso que
    alguien se olvide o no hay proveedor que contenga a ciertos componentes que 
    dentro de ellos esten haciendo uso del contexto 
  
 */

//creamos un contexto

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notas, setNotas] = useState<INota[]>([]);

  //creamos un estado para la nota seleccionada, al principio esta ok que no este seleccionada una

  const [bandDropNote,setBandDropNote]=useState<boolean>(false)
  const [selectedNote, setSelectedNote] = useState<INota|null>(null)
    //el mismo tendra valor cuando querramos editar algo
  const loadNotas = async () => {
    const res = await fetch("http://localhost:3000/api/notes");

    const data = await res.json();

    setNotas(data);
  };

  const updatedNote=async(id:number,nota: TUpdateNote)=>{
    const res = await fetch("/api/notes/"+id, {
        method: "PUT",
        body: JSON.stringify(nota),
      });
      const data = await res.json();
      //setNotas([data, ...notas]);
      loadNotas()
      
  }

  const crearNotas = async (nota: TNota) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(nota),
    });
    const data = await res.json();
    setNotas([data, ...notas]);
  };

  const deleteNote = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });

    const deletedNote = await res.json();
    /**
     *aca el tipo no lo menciona, pero creo que hay 2 maneras de encarar esto
     una vez eliminado, actualizo el conjunto de datos a traves de un filtrado
     y asi tengo las notas sin el que acaba de ser eliminado
     - la otra es simplemente llamar a la funcion loadnota y listo
     se lo puede mirar como quizas al llamar a la funcion nota , estoy 
     haciendo otra peticion, mientras que al actualizar estado, no hago otra peticion
     entonces queda en el razonamiento de que es lo mas conveniente, uno en el cual
     se actualiza el estado y evito tener que hacer otra peticion.
     Al realizar otra peticion con la funcion loadnotas estoy no solo actualizando 
     las notas, sino que tambien podria estar trayendo otras notas que se podrian
     llegar a cargar casi al mismo tiempo este enfoque creo yo que es mejor, puesto
     que se piensa a futuro y en proyectos mas grandes, donde hay mas concurrencias
     y esto puede pasar
     */
    await loadNotas();
    setBandDropNote(true)
  };

  return (
    <NoteContext.Provider value={{ notas, loadNotas, crearNotas, deleteNote ,selectedNote, setSelectedNote,updatedNote,bandDropNote,setBandDropNote}}>      {children}
    </NoteContext.Provider>
  );
};
