import pgp from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";
import { Database } from "./Database";

export class PostgresDatabase implements Database {
  private static instance: PostgresDatabase;
  private client: pgp.IDatabase<{}, IClient>;

  private constructor() {
    const connectionString = process.env.DB_CONNECTION_STRING as string;
    this.client = pgp()(connectionString);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PostgresDatabase();
    }

    return this.instance;
  }

  public async executeQuery(
    query: string,
    parameters: any[] = []
  ): Promise<any> {
    return this.client.query(query, parameters);
  }
}
