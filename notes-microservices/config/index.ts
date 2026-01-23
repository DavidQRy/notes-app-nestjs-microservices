import * as joi from 'joi'
import 'dotenv/config'


interface EnviromentsVars {
    NATS_SERVER: string;
}

const enviromentSchema = joi.object({
    NATS_SERVER: joi.string().required()
}).unknown()

const { error, value } = enviromentSchema.validate({
    ...process.env
})

if(error){
    throw new Error(`EnviromentVars error: ${error.message}`)
}

const enviromentsVars: EnviromentsVars = value

export const enviroments = {
    natsServer: enviromentsVars.NATS_SERVER
}