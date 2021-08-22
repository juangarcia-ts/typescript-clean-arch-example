export interface Database {
  executeQuery(query: string, parameters?: any[]): Promise<any>;
}
