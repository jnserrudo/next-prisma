'use client'
import React,{ useContext }  from 'react'
import { NoteContext } from "@/context/NoteContext";
import NoteCard from './NoteCard';

export const Notas =async () => {
    const {notas}=useContext(NoteContext)

    return (
      <div  >
        {notas.map((nota)=>{
            
          return(
            <NoteCard nota={nota} key={nota.id} />
          )
        })}
      </div>
    )
}
