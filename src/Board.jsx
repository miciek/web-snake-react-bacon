import React, { Component, PropTypes } from "react";
import _ from "underscore";
import classNames from "classnames";
import Vector from "./Vector";
import './Board.css'

export default class Board extends Component {
  static propTypes = {
    size: PropTypes.instanceOf(Vector).isRequired,
    snakePositions: PropTypes.arrayOf(Vector).isRequired,
    fruitPosition: PropTypes.instanceOf(Vector).isRequired
  };

  render() {
    const { size, snakePositions, fruitPosition } = this.props;
    const rows = _.range(size.y).map(y => {
      const cells = _.range(size.x).map(x => {
        const pos = new Vector(x, y);
        const maybeSnakeStyle = { "snake": snakePositions.find(x => x.equals(pos)) };
        const maybeFruitStyle = { "fruit": fruitPosition.equals(pos) };
        return <div key={x} className={ classNames("cell", maybeSnakeStyle, maybeFruitStyle) }/>;
      });
      return <div key={y} className="row">{cells}</div>;
    });

    return <div className="board">{rows}</div>;
  }
}
