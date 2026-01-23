import { IsString, MaxLength } from "class-validator";

export class CreateNoteDto {
    @IsString()
    @MaxLength(55)
    title: string

    @IsString()
    content: string

    @IsString()
    userId: string
}
