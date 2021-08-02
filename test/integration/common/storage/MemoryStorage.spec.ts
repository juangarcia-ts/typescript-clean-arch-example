import { MemoryStorage } from "../../../../src/common/storage/MemoryStorage";

describe("MemoryStorage", () => {
  const storage = new MemoryStorage<string>();
  const newItem = "New item";

  it("should persist item in memory and clear all", () => {
    storage.save(newItem);
    const items = storage.findAll();
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(newItem);
  });

  it("should clear all items", () => {
    storage.save(newItem);
    storage.clear();
    const items = storage.findAll();
    expect(items).toHaveLength(0);
  });
});
