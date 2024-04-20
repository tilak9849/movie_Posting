// import { NETWORK_AUTHENTICATION_REQUIRED } from 'http-status-codes'
import { z }  from 'zod'

export const createmovieDtobody = z.object({
    title: z.string({
        required_error: "Quote is not given "
    }),
  year:z.number({
    required_error:"Please enter the released year"
  })
}).strict()
export const createMovie= z.object({
    body: createmovieDtobody
})


export const updatemovieDtobody = z.object({
    text: z.string({
        required_error: "Quote is not given "
    }).optional(),
    year:z.number({
        required_error:"Please enter the released year"
      }).optional(),
}).strict()
export const updateMovie= z.object({
    body: updatemovieDtobody
})


