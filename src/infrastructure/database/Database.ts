export interface Database {
  executeQuery<T>(query: string, parameters?: any[]): Promise<any>;
}
