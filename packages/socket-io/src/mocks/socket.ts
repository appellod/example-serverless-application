import * as Chance from "chance";

const chance = new Chance();

export class SocketMock {
  public emit: (event: string) => boolean;
  public id: string;
  public join: (name: string) => void;
  public leave: (name: string) => void;

  constructor() {
    this.emit = (event) => true;
    this.id = chance.hash();
    this.join = (name) => undefined;
    this.leave = (name) => undefined;
  }
}
