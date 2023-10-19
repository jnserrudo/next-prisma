import { Notas } from "@/components/Notas";
import { NotasForm } from "@/components/NotasForm";
import React from "react";
import { NotesProvider } from "@/context/NoteContext";
const HomePage = async () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <NotesProvider>
          <NotasForm />
          <Notas/>
        </NotesProvider>
        
      </div>
    </div>
  );
};

export default HomePage;
