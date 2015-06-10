var SnakeGame = React.createClass({
    statics: {
        boardSize: new Position(20, 20)
    },

    getDefaultProps: function() {
        return {
            initialSnakeDirection: new Position(0, 1),
            initialSnakeLength: 3,
            snakeStartPosition: new Position(0,0)
        };
    },

    getInitialState: function() {
        return {
            snakePositions: [],
            fruitPositions: [],
            score: 0,
            snakeLength: this.props.initialSnakeLength
        };
    },

    componentWillMount: function() {
        var keys = $(document).keyupE().map('.keyCode');
        var lefts = keys.filter(function(x) { return x === 37 });
        var rights = keys.filter(function(x) { return x === 39 });
        var restart = keys.filter(function(x) { return x === 82 });
        var tick = Bacon.interval(100);
        this.inputs = { left: lefts, right: rights, tick: tick, restart: restart };

        this.fruitPositions = new Bacon.Bus();
    },

    componentDidMount: function() {
        var headPositions = this.snakeHeadPositions();
        headPositions
            .scan([], function(buf, x) {
                return _.union(_.last(buf, this.state.snakeLength), [x]);
            }.bind(this))
            .onValue(function(snake) {
            this.setState({
               snakePositions: snake
            });
        }.bind(this));

        this.fruitPositions.onValue(function(fruit) {
            this.setState({
               fruitPositions: [fruit]
            });
        }.bind(this));
        this.generateNewFruit();

        headPositions.filter(function(head) {
            return contains(this.state.fruitPositions, head);
        }.bind(this)).onValue(function(x) {
            this.fruitEaten();
        }.bind(this));
    },

    snakeHeadPositions: function() {
        var leftsMappedToRotations = this.inputs.left.map(function() { return rotateLeft });
        var rightsMappedToRotations = this.inputs.right.map(function() { return rotateRight });
        var actions = leftsMappedToRotations.merge(rightsMappedToRotations);

        var directions = actions.scan(this.props.initialSnakeDirection, function(x, f) { return f(x) });

        return directions
            .sampledBy(this.inputs.tick)
            .scan(this.props.snakeStartPosition, function(x,y) { return x.add(y).mod(SnakeGame.boardSize) });
    },

    fruitEaten: function() {
        this.setState({
            score: this.state.score + 1,
            snakeLength: this.state.snakeLength + 1
        });

        this.generateNewFruit();
    },

    generateNewFruit: function() {
        this.fruitPositions.push(randomPosition(SnakeGame.boardSize));
    },


    render: function() {
        return (
            <div className="game">
                <div>Score: {this.state.score}</div>
                <Board snakePositions={this.state.snakePositions} fruitPositions={this.state.fruitPositions} />
            </div>
        );
    }
});