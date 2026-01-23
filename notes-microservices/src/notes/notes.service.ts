import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaClient } from 'generated/prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class NotesService extends PrismaClient implements OnModuleInit {
  
  async onModuleInit() {
      await this.$connect()
  }
  async create(createNoteDto: CreateNoteDto) {
    
    try {
      return await this.note.create({
        data: createNoteDto
      })
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message
      })
    }
  }

  async findAll(id: string) {
    return await this.note.findMany({
      where: {
        userId: id
      }
    });
  }

  findOne(id: string) {
    // try {
    //   return await this.nota.findOne({
    //     where: {
    //       id
    //     }
    //   })
    // } catch (error) {
    //   throw new RpcException({
    //     status: 400,
    //     message : error.message 
    //   })
    // }
    return `This action returns a #${id} note`;

  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
