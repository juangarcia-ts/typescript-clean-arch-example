export class MemoryStorage<T> {
  private items: T[] = [];

  public listAll(): T[] {
    return this.items;
  }

  public append(item: T): void {
    this.items.push(item);
  }
}
