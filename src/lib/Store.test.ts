import { GameStore } from "./Store";

describe("GameStore", () => {
  describe("setPressedKey()", () => {
    it("changes PacMan's direction", () => {
      const store = new GameStore();
      store.update(1);
      store.setPressedKey("ArrowLeft");
      expect(store.pacMan.direction).toBe("LEFT");
      store.setPressedKey("ArrowRight");
      expect(store.pacMan.direction).toBe("RIGHT");
    });
  });

  describe("update()", () => {
    it("advances PacMans position", () => {
      const store = new GameStore();
      store.pacMan.x = 10;
      store.setPressedKey("ArrowRight");
      store.update(1);
      expect(store.pacMan.x).toBe(12);
      store.update(2);
      expect(store.pacMan.x).toBe(14);
    });
  });
});
