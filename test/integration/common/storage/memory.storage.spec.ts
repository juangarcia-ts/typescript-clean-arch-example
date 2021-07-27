import { MemoryStorage } from "../../../../src/common/storage/memory.storage";

describe("MemoryStorage", () => {
  const storage = new MemoryStorage<string>();

  describe("#append + #listAll", () => {
    const newItem = "New item";

    it("should persist item in memory ", () => {
      storage.append(newItem);
      const items = storage.listAll();
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(newItem);
    });
  });
});
