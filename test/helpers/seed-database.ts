import { Database } from "../../src/infrastructure/database/Database";
import { PostgresDatabase } from "../../src/infrastructure/database/PostgresDatabase";

const clearDatabase = async (db: Database) => {
  await db.executeQuery("DELETE FROM public.coupon");
  await db.executeQuery("DELETE FROM public.order_item");
  await db.executeQuery("DELETE FROM public.order");
  await db.executeQuery("DELETE FROM public.item");
};

const seedItems = async (db: Database) => {
  await db.executeQuery(
    `INSERT INTO public.item ("id", "description", "price", "height", "width", "depth", "weight")
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    ["3ee14b1b-74cf-4fe4-bc5a-d4c3c598d4fb", "Item #1", 1000, 10, 10, 10, 1]
  );
};

export const seedDatabase = async () => {
  const db = PostgresDatabase.getInstance();
  await clearDatabase(db);
  await seedItems(db);
};
