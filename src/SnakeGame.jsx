import React from "react"
import Bacon from "baconjs"
import _ from "underscore"

import Vector from "./Vector"
import Board from "./Board"
import tools from "./tools"

import styles from "./style.css"

export default class SnakeGame extends React.Component {
    static propTypes = {
        boardSize: React.PropTypes.instanceOf(Vector).isRequired,
    }

    static defaultProps = {
        initialSnakeDirection: new Vector(0, 1),
        initialSnakeLength: 3,
        initialSnakePosition: new Vector(0, 0),
    }

    state = {
        snakePositions: [],
        fruitPositions: [Vector.random(this.props.boardSize)],
        score: 0,
    }

    inputStreams() {
        const keys = Bacon.fromEvent(document.body, "keyup").map('.keyCode')
        const lefts = keys.filter(x => x === 37)
        const rights = keys.filter(x => x === 39)
        const ticks = Bacon.interval(100)
        return { lefts: lefts, rights: rights, ticks: ticks }
    }

    componentDidMount() {
        const headPositions = this.snakeHeadPositions()
        headPositions
            .scan([], (buf, x) => _.last(_.union(buf, [x]), this.props.initialSnakeLength + this.state.score))
            .onValue(snake => this.setState({ snakePositions: snake }))

        const fruitEatenEvents = headPositions.filter(head => tools.contains(this.state.fruitPositions, head))
        fruitEatenEvents.onValue(() => this.setState({ score: this.state.score + 1 }))

        fruitEatenEvents.map(() => Vector.random(this.props.boardSize))
                        .onValue(position => this.setState({ fruitPositions: [position] }))
    }

    snakeHeadPositions() {
        const { lefts, rights, ticks } = this.inputStreams()
        const leftsMappedToRotations = lefts.map(() => Vector.rotateLeft)
        const rightsMappedToRotations = rights.map(() => Vector.rotateRight)
        const actions = leftsMappedToRotations.merge(rightsMappedToRotations)

        const directions = actions.scan(this.props.initialSnakeDirection, (x, f) => f(x))

        return directions
            .sampledBy(ticks)
            .scan(this.props.initialSnakePosition, (x, y) => x.add(y).mod(this.props.boardSize))
    }

    render() {
        return (
            <div className={styles.game}>
                <div id={styles.log}>Score: {this.state.score}</div>
                <Board size={this.props.boardSize} snakePositions={this.state.snakePositions} fruitPositions={this.state.fruitPositions}/>
            </div>
        )
    }
}
