import React from "react";
import Vector from "./Vector";

describe("Vector", () => {
  const v1 = new Vector(300, 401);
  const v2 = new Vector(300, 401);
  const v3 = new Vector(600, 802);
  const v4 = new Vector(301, 403);

  it("is equal to another instance of the same Vector", () => {
    expect(v1.equals(v2)).toBe(true);
  });

  it("is not equal to another Vector", () => {
    expect(v1.equals(v3)).toBe(false);
  });

  it("can be added to another Vector", () => {
    expect(v1.add(v2).equals(v3)).toBe(true);
  });

  it("can be modded if the coordinates are outside of a range", () => {
    expect(v4.mod(v1).equals(new Vector(1, 2))).toBe(true);
  });

  it("rotated 4 times to the left gives the same vector", () => {
    const f = Vector.rotateLeft;
    expect(f(f(f(f(v4)))).equals(v4)).toBe(true);
  });

  it("rotated 4 times to the right gives the same vector", () => {
    const f = Vector.rotateRight;
    expect(f(f(f(f(v4)))).equals(v4)).toBe(true);
  });
});
