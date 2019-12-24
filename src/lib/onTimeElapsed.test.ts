import { GameStore } from "./Store";
import { onTimeElapsed } from "./onTimeElapsed";

describe("onTimeElapsed()", () => {
  it("advances PacMans position", () => {
    // Arrange
    const store = new GameStore();
    store.pacMan.x = 10;
    store.setPressedKey("ArrowRight");

    // Act
    onTimeElapsed({ store, timestamp: 1 });

    // Assert
    expect(store.pacMan.x).toBe(12);

    // Act
    onTimeElapsed({ store, timestamp: 2 });

    // Assert
    expect(store.pacMan.x).toBe(14);
  });
});
