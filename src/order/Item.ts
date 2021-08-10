import { Dimension } from "./Dimension";

export class Item {
  public id: string;
  public description: string;
  public price: number;
  public dimension: Dimension;

  constructor(
    id: string,
    description: string,
    price: number,
    dimension: Dimension
  ) {
    this.id = id;
    this.description = description;
    this.price = price;
    this.dimension = dimension;
  }
}
