import React from "react"
import _ from "underscore"

import Position from "../Position"
import tools from "../tools"

import styles from "../style.css"

export default React.createClass({
    propTypes: {
        snakePositions: React.PropTypes.arrayOf(Position).isRequired,
        fruitPositions: React.PropTypes.arrayOf(Position).isRequired,
        size: React.PropTypes.instanceOf(Position).isRequired
    },

    render: function () {
        var rows = _.range(this.props.size.y).map(function (y) {
            var cells = _.range(this.props.size.x).map(function (x) {
                var className = styles.cell
                if (tools.contains(this.props.snakePositions, new Position(x, y))) className += " " + styles.snake
                if (tools.contains(this.props.fruitPositions, new Position(x, y))) className += " " + styles.fruit

                return <div key={"r" + y + "c" + x} className={className}/>
            }.bind(this))
            return <div key={y} className={styles.row}>{cells}</div>
        }.bind(this))

        return <div className={styles.board}>{rows}</div>
    }
})
