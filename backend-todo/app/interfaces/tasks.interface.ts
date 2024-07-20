import { IsString, IsIn, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class Task {
    id?: number;

    @MinLength(3, { message: 'O titúlo deve ter pelo menos 3 caracteres.' })
    @MaxLength(30, { message: 'O titúlo deve ter no máximo 30 caracteres.' })
    @IsString({ message: 'O titúlo deve ser uma string.' })
    @IsNotEmpty({ message: 'O titúlo deve ser informado.' })
    title: string = "";

    @MinLength(3, { message: 'A descrição deve ter pelo menos 3 caracteres.' })
    @MaxLength(50, { message: 'A descrição deve ter no máximo 50 caracteres.' })
    @IsString({ message: 'A descrição deve ser uma string.' })
    @IsNotEmpty({ message: 'A descrição deve ser informada.' })
    description: string = "";

    @IsIn(['todo', 'done'], { message: 'O status deve ser um dos seguintes: todo ou done.' })
    status: 'todo' | 'done' = "todo";
}
