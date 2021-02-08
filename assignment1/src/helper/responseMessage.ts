export class ResponseMessage {
  public message: string;
  public data: any;
  /**
   *
   */
  constructor(message: string, data: any) {
    this.data = data;
    this.message = message;
  }
}
