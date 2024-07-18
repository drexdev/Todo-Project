import { IsString, IsIn, IsNotEmpty } from 'class-validator';

export class Task {
    id?: number;

    @IsString({ message: 'O titúlo deve ser uma string.' })
    @IsNotEmpty({ message: 'O titúlo deve ser informado.' })
    title: string = "";

    @IsString({ message: 'A descrição deve ser uma string.' })
    @IsNotEmpty({ message: 'A descrição deve ser informada.' })
    description: string = "";

    @IsIn(['todo', 'doing', 'done'], { message: 'O status deve ser um dos seguintes: todo, doing ou done.' })
    status: 'todo' | 'doing' | 'done' = "todo";
}
