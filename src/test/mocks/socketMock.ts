import * as Chance from "chance";

const chance = new Chance();

export class SocketMock {
  public emit: (event: string) => boolean;
  public id: string;

  constructor() {
    this.emit = (event) => true;
    this.id = chance.string();
  }
}