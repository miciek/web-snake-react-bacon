import React, { Component, PropTypes } from "react";
import _ from "underscore";

import Vector from "./Vector";

import style from "./style.css";
import classNames from "classnames";

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
        const maybeSnakeStyle = { [style.snake]: snakePositions.find(x => x.equals(pos)) };
        const maybeFruitStyle = { [style.fruit]: fruitPosition.equals(pos) };
        return <div key={x} className={ classNames(style.cell, maybeSnakeStyle, maybeFruitStyle) }/>;
      });
      return <div key={y} className={style.row}>{cells}</div>;
    });

    return <div className={style.board}>{rows}</div>;
  }
}
