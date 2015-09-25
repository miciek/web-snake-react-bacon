import React from "react"
import Bacon from "baconjs"
import _ from "underscore"

import Vector from "./Vector"
import Board from "./Board"

import style from "./style.css"

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
        fruitPosition: Vector.random(this.props.boardSize),
        score: 0,
    }

    inputStreams() {
        const keys = Bacon.fromEvent(document.body, "keyup").map('.keyCode')
        const lefts = keys.filter(x => x === 37)
        const rights = keys.filter(x => x === 39)
        const ticks = Bacon.interval(100)
        return { lefts, rights, ticks }
    }

    componentDidMount() {
        const headPositions = this.snakeHeadPositions(this.inputStreams())
        headPositions
            .scan([], (buf, x) => _.last(_.union(buf, [x]), this.props.initialSnakeLength + this.state.score))
            .onValue(snake => this.setState({ snakePositions: snake }))

        const fruitEatenEvents = headPositions.filter(head => head.equals(this.state.fruitPosition))
        fruitEatenEvents.onValue(() => this.setState({ score: this.state.score + 1 }))

        fruitEatenEvents.map(() => Vector.random(this.props.boardSize))
                        .onValue(position => this.setState({ fruitPosition: position }))
    }

    snakeHeadPositions({ lefts, rights, ticks }) {
        const leftRotations = lefts.map(() => Vector.rotateLeft)
        const rightRotations = rights.map(() => Vector.rotateRight)
        const actions = leftRotations.merge(rightRotations)

        const directions = actions.scan(this.props.initialSnakeDirection, (x, f) => f(x))

        return directions
            .sampledBy(ticks)
            .scan(this.props.initialSnakePosition, (x, y) => x.add(y).mod(this.props.boardSize))
    }

    render() {
        return (
            <div className={style.game}>
                <div id={style.log}>Score: {this.state.score}</div>
                <Board size={this.props.boardSize} snakePositions={this.state.snakePositions} fruitPosition={this.state.fruitPosition}/>
            </div>
        )
    }
}
