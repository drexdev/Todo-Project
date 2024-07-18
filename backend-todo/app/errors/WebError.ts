export class WebError extends Error {
    statusCode: number;
    messages: string | string[];

    constructor(statusCode: number, messages: string | string[]) {
        super();
        this.statusCode = statusCode;
        this.messages = messages;
    }
}
