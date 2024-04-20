import { Prisma, PrismaClient } from "@prisma/client"
import  Boom from "@hapi/boom";
import { any } from "zod";
import { query } from "express";
const prisma = new PrismaClient({
});



export const getAll = async() => {
    return prisma.movie.findMany({

    })
}

export const postMovies = async (movie:any, userId: number) =>{
    try{
        return await prisma.movie.create({  
            data:{
                userId: userId,
                title:movie.title,
              year : movie.year
            }
            
        })
    }catch(err:any){
        throw Boom.forbidden("You can not post")
    }
  
}


export const update= async (id: number, movie: any, loggedInUserId: number) => {
    const quoteToUpdate = await prisma.movie.findFirstOrThrow({where: {id}})
    if(quoteToUpdate.userId != loggedInUserId) {
        throw Boom.forbidden('You cannnot do thissss')
    }
    return await prisma.movie.update({
        where: { id: Number(id) },
        data: {
           
            title:movie.text,
            year : movie.year
        },
    })
}
export const remove = async (id: number, loggedInUserId: number) => {
    try {
        const quote = await prisma.movie.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                userId: true,
            },
        });
  
        if (!quote) {
            throw Boom.notFound("Movie not found!!");
        }
  
        if (quote.userId !== loggedInUserId) {
            throw Boom.forbidden("This ain't your movie");
        }
  
        return await prisma.movie.delete({
            where: {
                id: Number(id),
            },
        });
    } catch (error: any) {
        console.log('Something terrible is happening', error);
        throw error; // Re-throw the error to propagate it further
    }
  };



