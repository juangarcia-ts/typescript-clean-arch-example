import { Item } from "../../../domain/entity/Item";
import { ItemRepository } from "../../../domain/repository/ItemRepository";

export class ItemRepositoryMemory implements ItemRepository {
  private items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  public findOneById(id: string): Item | undefined {
    return this.items.find((item) => item.id === id);
  }
}
