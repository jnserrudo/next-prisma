import React, { useContext } from "react";
import /* INota */ "@/interfaces/Note";
import { Nota as INota } from "@prisma/client";

import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { NoteContext } from "@/context/NoteContext";

const NoteCard = ({ nota }: { nota: INota }) => {
  const { deleteNote, setSelectedNote } = useContext(NoteContext);

  const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    //console.log("click del boton edit de la nota con id " + nota.id, e.target);

    console.log(nota);
    //a la nota completa se la mandamos al selected note
    setSelectedNote(nota);
  };

  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(
      "click del boton delete de la nota con id " + nota.id,
      e.target
    );
    if (confirm("Estas seguro de eliminar la nota?")) deleteNote(+nota.id);
  };
  return (
    <div
      key={nota.id}
      className="bg-slate-400 p-3 m-1 rounded-lg flex justify-between"
    >
      <div>
        <p className=" text-xl font-bold ">{nota.title}</p>
        <p>{nota.content}</p>
        <p>
          {nota.updateAt
            ? new Date(nota.updateAt).toLocaleDateString()
            : new Date(nota.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-x-2">
        <button onClick={handleClickEdit}>
          <AiOutlineEdit size={24} />
        </button>
        <button onClick={handleClickDelete}>
          <AiFillDelete size={24} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
