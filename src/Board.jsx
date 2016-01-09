import React from "react"
import _ from "underscore"

import Vector from "./Vector"

import style from "./style.css"
import classNames from "classnames"

export default class Board extends React.Component {
  static propTypes = {
    size: React.PropTypes.instanceOf(Vector).isRequired,
    snakePositions: React.PropTypes.arrayOf(Vector).isRequired,
    opponentPositions: React.PropTypes.arrayOf(Vector),
    fruitPosition: React.PropTypes.instanceOf(Vector).isRequired
  }

  static defaultProps = {
    opponentPositions: []
  }

  render() {
    const { size, snakePositions, opponentPositions, fruitPosition } = this.props
    const rows = _.range(size.y).map(y => {
      const cells = _.range(size.x).map(x => {
        const pos = new Vector(x, y)
        const maybeSnakeStyle = { [style.snake]: snakePositions.find(x => pos.equals(x)) }
        const maybeOpponentStyle = { [style.opponent]: opponentPositions.find(x => pos.equals(x)) }
        const maybeFruitStyle = { [style.fruit]: fruitPosition.equals(pos) }
        return <div key={x} className={ classNames(style.cell, maybeOpponentStyle, maybeSnakeStyle, maybeFruitStyle) }/>
      })
      return <div key={y} className={style.row}>{cells}</div>
    })

    return <div className={style.board}>{rows}</div>
  }
}
