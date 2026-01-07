import { ifError } from 'assert';
import 'dotenv/config';
import * as joi from 'joi';

interface EnviromentVars {
  PORT: number;
  NATS_SERVER: string;
}

const enviromentSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVER: joi.string().required(),
  })
  .unknown();

const { error, value } = enviromentSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Enviroments error ${error}`);
}

const env: EnviromentVars = value;

export const enviromentsVars = {
  port: value.PORT,
  natsServer: value.NATS_SERVER,
};
