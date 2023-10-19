import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";

export async function GET(){
try {
    const allNotes=await prisma.nota.findMany()

    console.log(allNotes)

    return NextResponse.json(allNotes)
} catch (error) {
    if(error instanceof Error){
        return NextResponse.json({
            message:error.message
        },{
            status:500
        })    
    }
    
}
    
}

export async function POST(request:Request){ //Request es un objeto global de js que define una peticion

    try {
        //en ves de poner una vble con el nombre de body, simplemente destructuramos el body
        const {title,content}=await request.json()
        
        const newNote=await prisma.nota.create({
            data:{
                title,
                content
            }
        })
    
        return NextResponse.json(newNote)
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
                message:error.message
            },{
                status:500
            })    
        }
    }
}
