import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { enviromentsVars } from "src/config";


@Module({
    imports: [
        ClientsModule.register([
            {
                name: "NATS_SERVICE",
                transport: Transport.NATS,
                options: {
                    servers: enviromentsVars.natsServer
                }            
            }
        ])
    ],
    exports: [
        ClientsModule.register([
            {
                name: "NATS_SERVICE",
                transport: Transport.NATS,
                options: {
                    servers: enviromentsVars.natsServer
                }            
            }
        ])
    ]
})

export class NNatsModule {

}