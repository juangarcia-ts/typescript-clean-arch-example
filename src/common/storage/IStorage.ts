export interface IStorage<T> {
  findAll: () => T[];
  save: (item: T) => void;
  clear: () => void;
}
