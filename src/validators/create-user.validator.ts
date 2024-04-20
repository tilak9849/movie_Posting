/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from 'zod'
// import { isAdmin } from '../middleware/authentication.middleware'
export const createUserDtobody =  z.object({
    name: z.string({
        required_error:"name is not given"
    }),
    email: z
        .string({
            required_error: 'email is required',
        })
        .email('It is an email'),
    password: z.string({
        required_error: 'password is required',
    }),
   
})
export const createUserDto = z.object({
    body:createUserDtobody

})

export const updateUserDtobody =  z.object({
    username: z.string({
        required_error:"username is not given"
    }).optional(),
    email: z
        .string({
            required_error: 'email is required',
        })
        .email('It is an email'),
    password: z.string({
        required_error: 'password is required',
    }).optional(),
    
})
export const updateUserDto = z.object({
    body:updateUserDtobody

})

