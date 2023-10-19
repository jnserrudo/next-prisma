"use client";
import { NoteContext } from "@/context/NoteContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";

export const NotasForm = () => {
  const { loadNotas, crearNotas, selectedNote, setSelectedNote ,updatedNote,bandDropNote,setBandDropNote} = useContext(NoteContext);
  const [title, setTitle] = useState("");
  //en el caso de abajo, en el curso se habia puesto a la propiedad content como opcional
  //en mi caso lo puse como obligatorio, lo que no es necesario especificar que
  //puede ser string o nulo, por lo que se espera siempre un valor, en todo caso lo pongo solo como string, pero sin poner nada funciona igual
  const [content, setContent] = useState<string>(""); //useState<string|null>("");
  //ESO HAY QUE TENER EN CUENTA, LUEGO EL TIPO DEL CURSO SE DIO CUENTA QUE NO PUEDE TENER NULO
  //PORQUE ESTARIA PONIENDO TAMBIEN AL VALUE DEL INPUT UN NULO, COSA QUE NO SE PUEDE, ENTONCES
  //DEBERIA PONER UN STRING VACIO

  //const router=useRouter()
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote?.content ?? ""); //COMO ES OBLIGATORIO EL CAMPO CONTENT EN ESTE EJEMPLO, NO ES NECESARIO ESTA VALIDACION PARA EVITAR EL NULL, PERO IGUAL SE COLOCA COMO BUENA PRACTICA Y PARA TENER EN CUENTA
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedNote]);

  useEffect(()=>{
    if(bandDropNote){
      setTitle("");
      setContent("");
      setBandDropNote(false)
    }
  },[bandDropNote])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    };

  const handleClickCreate=async()=>{
    //no lo asignamos a una vble porque establecimos que no devuelve nada
    await crearNotas({
      title,
      content,
    });
    setTitle("");
    setContent("");
    //router.reload()

    titleRef.current?.focus(); //se carga una nota y se hace focus al input title
  
  }

  const handleClickEdit=async()=>{
    //no lo asignamos a una vble porque establecimos que no devuelve nada
    if(selectedNote){
      await updatedNote(selectedNote.id,{
        title,
        content,
      });
    }
    
    setTitle("");
    setContent("");
    //router.reload()

    titleRef.current?.focus(); //se carga una nota y se hace focus al input title
  
  }

  const handleClickCancel=()=>{
    setSelectedNote(null)
    /* setTitle("");
    esto se realizaria en el useEffect
    setContent(""); */
  }

  useEffect(() => {
    loadNotas();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus-ring-2 focus:ring-blue600 my-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
      />
      <textarea
        name="title"
        placeholder="Content"
        value={content}
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus-ring-2 focus:ring-blue600 my-2"
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        
        {!selectedNote? (<button
        onClick={handleClickCreate}
          /* type="submit" esto se hace en el caso que querramos trabajar con el evento submit del form, para mi es mejor tratar a cada uno por separado, sin ser un form*/
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700
          disabled:opacity-50 disabled:cursor-not-allowed
          "
          disabled={!title && !content}
        >
          Create
        </button>
        ) :(
          <>
            <button
              onClick={handleClickEdit}
              /* type="submit" esto se hace en el caso que querramos trabajar con el evento submit del form, para mi es mejor tratar a cada uno por separado, sin ser un form*/
              className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Editar
            </button>
            
            <button
              /* type="button" esto se hace en el caso que querramos trabajar con el evento submit del form, para mi es mejor tratar a cada uno por separado, sin ser un form*/
              className="px-5 py-2 text-white bg-red-500 rounded-md hover:bg-red-300"
              onClick={handleClickCancel}
            >
              Cancel
            </button>
          </>
          
        )}
      </div>
    </form>
  );
};
