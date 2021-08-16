import { Coupon } from "../../../domain/entity/Coupon";
import { Dimension } from "../../../domain/entity/Dimension";
import { Item } from "../../../domain/entity/Item";
import { ItemRepository } from "../../../domain/repository/ItemRepository";
import { Database } from "../../database/Database";

export class ItemRepositoryDatabase implements ItemRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async findOneById(id: string): Promise<Item | undefined> {
    const [row] = await this.db.executeQuery(
      "SELECT * FROM public.item WHERE id = $1",
      [id]
    );

    if (!row) {
      return;
    }

    return new Item(
      row.id,
      row.description,
      row.price,
      new Dimension(row.width, row.height, row.depth, row.weight)
    );
  }
}
