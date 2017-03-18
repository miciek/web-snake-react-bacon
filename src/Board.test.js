import React from "react";
import { shallow } from "enzyme";
import Vector from "./Vector";
import Board from "./Board";

describe("<Board />", () => {
  it("should render empty board", () => {
    const board = shallow(
      <Board size={new Vector(10, 10)} snakePositions={[]} fruitPosition={new Vector(-1, -1)} />
    );
    expect(board).toMatchSnapshot();
  });
});

describe("<Board />", () => {
  it("should render one fruit", () => {
    const board = shallow(
      <Board size={new Vector(3, 3)} snakePositions={[]} fruitPosition={new Vector(1, 1)} />
    );
    expect(board).toMatchSnapshot();
  });
});

describe("<Board />", () => {
  it("should render snake", () => {
    const snake = [new Vector(0, 1), new Vector(0, 2), new Vector(0, 3)];
    const board = shallow(
      <Board size={new Vector(10, 10)} snakePositions={snake} fruitPosition={new Vector(5, 6)} />
    );
    expect(board).toMatchSnapshot();
  });
});
