export {};

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

describe("assert", () => {
  it("asserts its conditition", () => {
    const s = "abc";
    const t: string | null = s.length === 3 ? null : "huhu";
    assert(t !== null);
    t.toString();
  });
});
