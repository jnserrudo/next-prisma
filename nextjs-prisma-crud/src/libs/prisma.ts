import { PrismaClient } from "@prisma/client";
// con esto podemos llamar la conexion a prisma en cualquier momento en cualquier parte del proyecto
// al trabajar con codigo de backend, que es donde vamos a necesitar la conexion de prisma
// next js lo que hace es volver a ejecutarse, entonces estara llamando conexiones innecesarias
//para este caso agregamos una configuracion extra

declare global {
    var prisma: PrismaClient | undefined
}
export const prisma = global.prisma || new PrismaClient() // aca usamos una vble declare global puesto que al no tener prisma el objeto global, me dara este error en TYPESCRIPT, porque creo que en js con poner un ? antes de prisma creo que se solucionaria

//si en el objeto global ya existe, lo usamos, en caso contrario creamos una nueva conexion con la base de datos
//esto es en desarrollo, por lo que realizamos lo siguiente
if(process.env.NODE!="production") global.prisma=prisma

// con esto ya tengo mi configuracion de conexion con prisma