import { GameStore } from "./Store";

describe("GameStore", () => {
  it("update()", () => {
    new GameStore().update(1);
  });
});
