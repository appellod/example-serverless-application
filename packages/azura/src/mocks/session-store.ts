import * as uuid from "uuid/v1";

import { SessionStore, SetOptions } from "../plugins";

export class SessionStoreMock implements SessionStore {
  public sessions: object;

  constructor() {
    this.sessions = {};
  }

  public async destroy(sid: string): Promise<any> {
    delete this.sessions[sid];
  }

  public async get(sid: string): Promise<any> {
    return this.sessions[sid];
  }

  public async set(session: any, options: SetOptions = {}): Promise<string> {
    session = session || {};
    session.sid = options.sid ? options.sid : uuid();

    const sid = session.sid;
    this.sessions[sid] = session;

    return sid;
  }
}
