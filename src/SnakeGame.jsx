import React from "react"
import Bacon from "baconjs"
import _ from "underscore"
import $ from "jquery"
import "bacon.jquery"

import Position from "./Position"
import Board from "./Board"
import tools from "./tools"

import styles from "./style.css"

export default class SnakeGame extends React.Component {
    static propTypes = {
        boardSize: React.PropTypes.instanceOf(Position).isRequired,
    }

    static defaultProps = {
        initialSnakeDirection: new Position(0, 1),
        initialSnakeLength: 3,
        initialSnakePosition: new Position(0, 0),
    }

    state = {
        snakePositions: [],
        fruitPositions: [],
        score: 0,
    }

    constructor(props) {
        super(props)
        const keys = $(document).keyupE().map('.keyCode')
        const lefts = keys.filter(x => x === 37)
        const rights = keys.filter(x => x === 39)
        const ticks = Bacon.interval(100)
        this.input = { lefts: lefts, rights: rights, ticks: ticks }
    }

    componentDidMount() {
        const headPositions = this.snakeHeadPositions()
        headPositions
            .scan([], (buf, x) => _.last(_.union(buf, [x]), this.props.initialSnakeLength + this.state.score))
            .onValue(snake => {
                this.setState({
                    snakePositions: snake
                })
            })

        this.generateNewFruit()

        headPositions.filter(head => tools.contains(this.state.fruitPositions, head))
                     .assign(this.fruitEaten)
    }

    snakeHeadPositions() {
        const leftsMappedToRotations = this.input.lefts.map(() => Position.rotateLeft)
        const rightsMappedToRotations = this.input.rights.map(() => Position.rotateRight)
        const actions = leftsMappedToRotations.merge(rightsMappedToRotations)

        const directions = actions.scan(this.props.initialSnakeDirection, (x, f) => f(x))

        return directions
            .sampledBy(this.input.ticks)
            .scan(this.props.initialSnakePosition, (x, y) => x.add(y).mod(this.props.boardSize))
    }

    fruitEaten() {
        this.setState({
            score: this.state.score + 1
        })

        this.generateNewFruit()
    }

    generateNewFruit() {
        this.setState({
            fruitPositions: [Position.randomPosition(this.props.boardSize)]
        })
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
