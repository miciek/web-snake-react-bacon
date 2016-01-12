import React, { Component, PropTypes } from "react"
import Bacon from "baconjs"
import _ from "underscore"

import Vector from "./Vector"
import Board from "./Board"
import style from "./style"

export default class SnakeGame extends Component {
  static propTypes = {
    boardSize: PropTypes.instanceOf(Vector).isRequired
  }

  static defaultProps = {
    initialSnakePosition: new Vector(0, 0),
    initialSnakeDirection: new Vector(0, 1),
    initialSnakeLength: 3
  }

  state = {
    snakePositions: [],
    fruitPosition: Vector.random(this.props.boardSize),
    score: 0
  }

  inputStreams() {
    const ticks = Bacon.interval(100)
    const keys = Bacon.fromEvent(document.body, "keyup").map(".keyCode")
    const lefts = keys.filter(key => key === 37)
    const rights = keys.filter(key => key === 39)
    return { ticks, lefts, rights }
  }

  snakeHeadPositions({ ticks, lefts, rights }) {
    const leftRotations = lefts.map(() => Vector.rotateLeft)
    const rightRotations = rights.map(() => Vector.rotateRight)
    const actions = leftRotations.merge(rightRotations)

    const directions = actions.scan(this.props.initialSnakeDirection, (dir, f) => f(dir))
    return directions
              .sampledBy(ticks)
              .scan(this.props.initialSnakePosition, (pos, dir) => pos.add(dir).mod(this.props.boardSize))
  }

  componentDidMount() {
    const snakeHeadPositions = this.snakeHeadPositions(this.inputStreams())
    const snakes = snakeHeadPositions.scan([], (snake, head) => {
      const biggerSnake = _.union(snake, [head])
      const validSnake = _.last(biggerSnake, this.props.initialSnakeLength + this.state.score)
      return validSnake
    })
    snakes.onValue(snake => this.setState({ snakePositions: snake }))

    const fruitEatenEvents = snakeHeadPositions.filter(head => head.equals(this.state.fruitPosition))
    fruitEatenEvents.onValue(() => this.setState({ score: this.state.score + 1 }))
    fruitEatenEvents.map(() => Vector.random(this.props.boardSize))
                    .onValue(fruit => this.setState({ fruitPosition: fruit }))
  }

  render() {
    return (
      <div className={style.game}>
        <div className={style.log}>Score: {this.state.score}</div>
        <Board size={this.props.boardSize} snakePositions={this.state.snakePositions} fruitPosition={this.state.fruitPosition}/>
      </div>
    )
  }
}
