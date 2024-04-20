import { Prisma, PrismaClient } from "@prisma/client";
import Boom from "@hapi/boom";
import  bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { z } from "zod";
import { createUserDtobody } from "../validators/create-user.validator";
const prisma = new PrismaClient();




export const createUser = async(user: z.infer<typeof createUserDtobody>)=>{
const{email, password, name} = user
    try{
    return await prisma.user.create({
        data:{
            email,
            password: await bcrypt.hash(password, 10),
            name
        }
    })

}catch(err:any){
    console.log(err)
    if(err.code==='P2002'){
        throw Boom.conflict('Email tei vayo change han na bhai')
    }else{
        throw(err)
    }
}
}


export async function login(email: string, password: string,username:string) {
    const user = await prisma.user.findFirstOrThrow({ where: { email } })

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        // Password does not match
        // If you want to throw a http error, you can. This is throw internal server error
      throw  Boom.conflict('Password not correct')
    }

    // Generate a token
    const token = jwt.sign(
        { userId: user.id},
        'random-secret',
        {
            expiresIn: '1d',
        }
    )

    // Return the token to the client
    return { success: true, token }
}



export const remove = async (userId: any) =>{
    try{
        return  await prisma.user.delete({where: {id:userId}})

    }catch(err:any){
       
    
    console.log(err)
    if(err.code === 'P2003'){
    throw Boom.notFound("You should delete your quotes first")
}else{
  throw err
}
}
}