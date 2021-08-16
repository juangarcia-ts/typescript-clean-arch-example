import pgp from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";
import { Database } from "./Database";

export class PostgresDatabase implements Database {
  private client: pgp.IDatabase<{}, IClient>;

  constructor() {
    const connectionString = process.env.DB_CONNECTION_STRING as string;
    this.client = pgp()(connectionString);
  }

  public async executeQuery(
    query: string,
    parameters: any[] = []
  ): Promise<any> {
    return this.client.query(query, parameters);
  }
}
