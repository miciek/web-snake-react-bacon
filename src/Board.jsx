import React from "react"
import _ from "underscore"

import Vector from "./Vector"
import tools from "./tools"

import styles from "./style.css"

export default class Board extends React.Component {
    static propTypes = {
        snakePositions: React.PropTypes.arrayOf(Vector).isRequired,
        fruitPositions: React.PropTypes.arrayOf(Vector).isRequired,
        size: React.PropTypes.instanceOf(Vector).isRequired,
    }

    render() {
        const rows = _.range(this.props.size.y).map(y => {
            const cells = _.range(this.props.size.x).map(x => {
                let className = styles.cell
                if (tools.contains(this.props.snakePositions, new Vector(x, y))) className += " " + styles.snake
                if (tools.contains(this.props.fruitPositions, new Vector(x, y))) className += " " + styles.fruit

                return <div key={"r" + y + "c" + x} className={className}/>
            })
            return <div key={y} className={styles.row}>{cells}</div>
        })

        return <div className={styles.board}>{rows}</div>
    }
}
