define(function(require) {
    var React = require('react');
    var Bacon = require('baconjs');
    var _ = require('underscorejs');
    var $ = require('jquery');
    require('bacon.jquery');

    var Position = require('Position');
    var Board = require('components/Board');
    var tools = require('tools');

    return React.createClass({
        propTypes: {
            boardSize: React.PropTypes.instanceOf(Position).isRequired
        },

        getDefaultProps: function () {
            return {
                initialSnakeDirection: new Position(0, 1),
                initialSnakeLength: 3,
                snakeStartPosition: new Position(0, 0)
            };
        },

        getInitialState: function () {
            return {
                snakePositions: [],
                fruitPositions: [],
                score: 0,
                snakeLength: this.props.initialSnakeLength
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
            var restart = keys.filter(function (x) {
                return x === 82;
            });
            var tick = Bacon.interval(100);
            this.inputs = {left: lefts, right: rights, tick: tick, restart: restart};

            this.fruitPositions = new Bacon.Bus();
        },

        componentDidMount: function () {
            var headPositions = this.snakeHeadPositions();
            headPositions
                .scan([], function (buf, x) {
                    return _.union(_.last(buf, this.state.snakeLength), [x]);
                }.bind(this))
                .onValue(function (snake) {
                    this.setState({
                        snakePositions: snake
                    });
                }.bind(this));

            this.fruitPositions.onValue(function (fruit) {
                this.setState({
                    fruitPositions: [fruit]
                });
            }.bind(this));
            this.generateNewFruit();

            headPositions.filter(function (head) {
                return tools.contains(this.state.fruitPositions, head);
            }.bind(this)).onValue(function (x) {
                this.fruitEaten();
            }.bind(this));
        },

        snakeHeadPositions: function () {
            var leftsMappedToRotations = this.inputs.left.map(function () {
                return Position.rotateLeft;
            });
            var rightsMappedToRotations = this.inputs.right.map(function () {
                return Position.rotateRight;
            });
            var actions = leftsMappedToRotations.merge(rightsMappedToRotations);

            var directions = actions.scan(this.props.initialSnakeDirection, function (x, f) {
                return f(x);
            });

            return directions
                .sampledBy(this.inputs.tick)
                .scan(this.props.snakeStartPosition, function (x, y) {
                    return x.add(y).mod(this.props.boardSize);
                }.bind(this));
        },

        fruitEaten: function () {
            this.setState({
                score: this.state.score + 1,
                snakeLength: this.state.snakeLength + 1
            });

            this.generateNewFruit();
        },

        generateNewFruit: function () {
            this.fruitPositions.push(Position.randomPosition(this.props.boardSize));
        },

        render: function () {
            return (
                <div className="game">
                    <div>Score: {this.state.score}</div>
                    <Board size={this.props.boardSize} snakePositions={this.state.snakePositions} fruitPositions={this.state.fruitPositions}/>
                </div>
            );
        }
    });
});