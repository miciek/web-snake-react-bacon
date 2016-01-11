import React from "react"
import Bacon from "baconjs"
import _ from "underscore"

import Vector from "./Vector"
import Board from "./Board"
import style from "./style"

export default class MultiSnakeGame extends React.Component {
  static propTypes = {
    boardSize: React.PropTypes.instanceOf(Vector).isRequired,
    playerName: React.PropTypes.string.isRequired,
    playerStates: React.PropTypes.instanceOf(Bacon.EventStream).isRequired,
    fruitStates: React.PropTypes.instanceOf(Bacon.EventStream).isRequired,
    onNewSnake: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    initialSnakePosition: new Vector(0, 0),
    initialSnakeDirection: new Vector(0, 1),
    initialSnakeLength: 3
  }

  state = {
    snakePositions: [],
    fruitPosition: new Vector(-1, -1),
    score: 0,
    opponentPositions: [],
    opponentScore: 0
  }

  inputStreams() {
    const ticks = Bacon.interval(100)
    const keys = Bacon.fromEvent(document.body, "keyup").map(".keyCode")
    const lefts = keys.filter(key => key === 37)
    const rights = keys.filter(key => key === 39)
    return { ticks: ticks, lefts: lefts, rights: rights }
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

  reactToPlayerStates(playerStates) {
    const opponentEvents = playerStates.filter(event => event.playerName !== this.props.playerName)
    const opponentPositions = opponentEvents.map(event => event.positions)
    opponentPositions.onValue(positions => this.setState({ opponentPositions: positions }))

    const myScores = playerStates
                        .filter(event => event.playerName === this.props.playerName)
                        .map(".score")
    myScores.onValue(score => this.setState({ score: score }))

    const opponentScores = opponentEvents.map(".score")
    opponentScores.onValue(score => this.setState({ opponentScore: score }))
  }

  componentDidMount() {
    const snakeHeadPositions = this.snakeHeadPositions(this.inputStreams())
    const snakes = snakeHeadPositions.scan([], (snake, head) => {
      const biggerSnake = _.union(snake, [head])
      const validSnake = _.last(biggerSnake, this.props.initialSnakeLength + this.state.score)
      return validSnake
    })
    snakes.onValue(snake => this.setState({ snakePositions: snake }))
    snakes.onValue(snake => this.props.onNewSnake(snake))

    this.reactToPlayerStates(this.props.playerStates)
    this.props.fruitStates.onValue(fruit => this.setState({ fruitPosition: fruit }))
  }

  render() {
    return (
      <div className={style.game}>
        <div className={style.log}>Score: <b>{this.state.score}</b> vs {this.state.opponentScore}</div>
        <Board size={this.props.boardSize} snakePositions={this.state.snakePositions} fruitPosition={this.state.fruitPosition} opponentPositions={this.state.opponentPositions} />
      </div>
    )
  }
}
