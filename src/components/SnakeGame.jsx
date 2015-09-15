import React from "react"
import Bacon from "baconjs"
import _ from "underscore"
import $ from "jquery"
import "bacon.jquery"

import Position from "../Position"
import Board from "./Board"
import tools from "../tools"

import styles from "../snake.css"

export default React.createClass({
    propTypes: {
        boardSize: React.PropTypes.instanceOf(Position).isRequired
    },

    getDefaultProps: function () {
        return {
            initialSnakeDirection: new Position(0, 1),
            initialSnakeLength: 3,
            initialSnakePosition: new Position(0, 0)
        };
    },

    getInitialState: function () {
        return {
            snakePositions: [],
            fruitPositions: [],
            score: 0
        };
    },

    componentWillMount: function () {
        var keys = $(document).keyupE().map('.keyCode');
        var lefts = keys.filter(function (x) {
            return x === 37;
        });
        var rights = keys.filter(function (x) {
            return x === 39;
        });
        var ticks = Bacon.interval(100);
        this.input = {lefts: lefts, rights: rights, ticks: ticks};
    },

    componentDidMount: function () {
        var headPositions = this.snakeHeadPositions();
        headPositions
            .scan([], function (buf, x) {
                return _.last(_.union(buf, [x]), this.props.initialSnakeLength + this.state.score);
            }.bind(this))
            .onValue(function (snake) {
                this.setState({
                    snakePositions: snake
                });
            }.bind(this));

        this.generateNewFruit();

        headPositions.filter(function (head) {
            return tools.contains(this.state.fruitPositions, head);
        }.bind(this)).assign(this.fruitEaten);
    },

    snakeHeadPositions: function () {
        var leftsMappedToRotations = this.input.lefts.map(function () {
            return Position.rotateLeft;
        });
        var rightsMappedToRotations = this.input.rights.map(function () {
            return Position.rotateRight;
        });
        var actions = leftsMappedToRotations.merge(rightsMappedToRotations);

        var directions = actions.scan(this.props.initialSnakeDirection, function (x, f) {
            return f(x);
        });

        return directions
            .sampledBy(this.input.ticks)
            .scan(this.props.initialSnakePosition, function (x, y) {
                return x.add(y).mod(this.props.boardSize);
            }.bind(this));
    },

    fruitEaten: function () {
        this.setState({
            score: this.state.score + 1
        });

        this.generateNewFruit();
    },

    generateNewFruit: function () {
        this.setState({
            fruitPositions: [Position.randomPosition(this.props.boardSize)]
        });
    },

    render: function () {
        return (
            <div className={styles.game}>
                <div id={styles.log}>Score: {this.state.score}</div>
                <Board size={this.props.boardSize} snakePositions={this.state.snakePositions} fruitPositions={this.state.fruitPositions}/>
            </div>
        );
    }
});
