export interface Task {
    id?: number;
    title: string;
    description: string;
    status: "todo" | "doing" | "done";
}