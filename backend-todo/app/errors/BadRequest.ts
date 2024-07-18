import { WebError } from "./WebError";

export class BadRequest extends WebError {
  constructor(message: string | string[]) {
    super(400, message);
  }
}
