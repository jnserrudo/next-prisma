import { NextResponse } from "next/server";

import {Prisma} from "@prisma/client"

import { prisma } from "@/libs/prisma";

interface IParams{
    params:{id:string}
}

//esto me lo invente yo
interface IError{
    error:Error|Prisma.PrismaClientKnownRequestError
}

export async function GET(request:Request,{params}:IParams){
    // en el segundo parametro estamos diciendo que se extrae a params, y que tiene una prop id q es string
try {
    console.log(params.id)

    let nota= await prisma.nota.findFirst({
        where:{
            id:+params.id
        }
    })

    
    let respuesta=nota?{nota,message:"Nota encontrada"}:{message:"Nota no encontrada"}
    return NextResponse.json(respuesta,{status:nota?200:404})

} catch (error) {
    if( error instanceof Prisma.PrismaClientKnownRequestError){
        console.log(error?.code,error.message)

        if(error.code==="P2025"){
            return NextResponse.json({
                message:"Nota no encontrada"
            },{
                status:404
            })   
    }

        return NextResponse.json({
            message:error.message
        },{
            status:500
        })
    }

    
}
   


}

export async function DELETE(request:Request,{params}:IParams){
    try {
        console.log(params.id)
    
        let nota= await prisma.nota.delete({
            where:{
                id:+params.id
            }
        })
    
        
        let respuesta=nota?{nota,message:"Nota eliminada"}:{message:"Nota no encontrada"}
        return NextResponse.json(respuesta,{status:nota?200:404})
    
    } catch (error) {
        if( error instanceof Prisma.PrismaClientKnownRequestError){
            console.log(error?.code,error.message)
    
            if(error.code==="P2025"){
                return NextResponse.json({
                    message:"Nota no encontrada"
                },{
                    status:404
                })   
        }
    
            return NextResponse.json({
                message:error.message
            },{
                status:500
            })
        }
    }
}

export async function PUT(request:Request,{params}:IParams){
    try {

        const {title,content}= await request.json()

        const updatedNota=await prisma.nota.update({
            where:{
                id:+params.id
            },
            data:{
                title,
                content
            }
        })

        return NextResponse.json({
            updatedNota,
            message:"puting one note"
        })
    } catch (error) {
        if( error instanceof Prisma.PrismaClientKnownRequestError){
            console.log(error?.code,error.message)
    
            if(error.code==="P2025"){
                return NextResponse.json({
                    message:"Nota no encontrada"
                },{
                    status:404
                })   
        }
    
            return NextResponse.json({
                message:error.message
            },{
                status:500
            })
        }
    }
}

