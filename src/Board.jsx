import React from "react"
import _ from "underscore"

import Vector from "./Vector"
import tools from "./tools"

import styles from "./style.css"
import classNames from "classnames"

export default class Board extends React.Component {
    static propTypes = {
        snakePositions: React.PropTypes.arrayOf(Vector).isRequired,
        fruitPositions: React.PropTypes.arrayOf(Vector).isRequired,
        size: React.PropTypes.instanceOf(Vector).isRequired,
    }

    isSnakePosition(position) {
      return tools.contains(this.props.snakePositions, position)
    }

    isFruitPosition(position) {
      return tools.contains(this.props.fruitPositions, position)
    }

    render() {
        const rows = _.range(this.props.size.y).map(y => {
            const cells = _.range(this.props.size.x).map(x => {
              const pos = new Vector(x, y)
              const snakeStyle = { [styles.snake]: this.isSnakePosition(pos) }
              const fruitStyle = { [styles.fruit]: this.isFruitPosition(pos) }
              return <div key={x} className={ classNames(styles.cell, snakeStyle, fruitStyle)}/>
            })
            return <div key={y} className={styles.row}>{cells}</div>
        })

        return <div className={styles.board}>{rows}</div>
    }
}
