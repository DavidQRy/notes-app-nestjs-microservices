import * as joi from 'joi'
import 'dotenv/config'

interface EnviromentsVars {
    NATS_SERVER: string
    JWt_SECRET: string
}

const enviromentsSchema = joi.object({
    NATS_SERVER: joi.string().required(),
    JWT_SECRET: joi.string().required()
}).unknown()

const {error, value } = enviromentsSchema.validate({
    ...process.env
})

if(error){
    throw new Error(`Check you enviroments vars: ${error}`)
}

const enviromentsVars: EnviromentsVars = value

export const enviroments = {
    natsServer: enviromentsVars.NATS_SERVER,
    SECRET: enviromentsVars.JWt_SECRET
}