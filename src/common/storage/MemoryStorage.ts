import { IStorage } from "./IStorage";

export class MemoryStorage<T> implements IStorage<T> {
  private items: T[] = [];

  public findAll(): T[] {
    return this.items;
  }

  public save(item: T): void {
    this.items.push(item);
  }

  public clear(): void {
    this.items = [];
  }
}
