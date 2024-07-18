import { WebError } from "./WebError";

export class NotFound extends WebError {
  constructor(message: string | string[]) {
    super(404, message);
  }
}
