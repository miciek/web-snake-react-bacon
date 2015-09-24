import React from "react"
import _ from "underscore"

import Vector from "./Vector"

import styles from "./style.css"
import classNames from "classnames"

export default class Board extends React.Component {
  static propTypes = {
    snakePositions: React.PropTypes.arrayOf(Vector).isRequired,
    fruitPosition: React.PropTypes.instanceOf(Vector).isRequired,
    size: React.PropTypes.instanceOf(Vector).isRequired,
  }

  render() {
    const { size, snakePositions, fruitPosition } = this.props
    const rows = _.range(size.y).map(y => {
      const cells = _.range(size.x).map(x => {
        const pos = new Vector(x, y)
        const maybeSnakeStyle = { [styles.snake]: snakePositions.find(x => x.equals(pos)) }
        const maybeFruitStyle = { [styles.fruit]: fruitPosition.equals(pos) }
        return <div key={x} className={ classNames(styles.cell, maybeSnakeStyle, maybeFruitStyle) }/>
      })
      return <div key={y} className={styles.row}>{cells}</div>
    })

    return <div className={styles.board}>{rows}</div>
  }
}
