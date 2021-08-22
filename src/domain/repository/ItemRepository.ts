import { Item } from "../entity/Item";

export interface ItemRepository {
  findOneById(id: string): Promise<Item | undefined>;
}
