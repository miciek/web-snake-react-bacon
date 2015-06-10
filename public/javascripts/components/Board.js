var Board = React.createClass({
    propTypes: {
        snakePositions: React.PropTypes.arrayOf(Position).isRequired,
        fruitPositions: React.PropTypes.arrayOf(Position).isRequired
    },

    render: function() {
        var rows = _.range(SnakeGame.boardSize.y).map(function(y) {
            var cells = _.range(SnakeGame.boardSize.x).map(function(x) {
                var className = "cell";
                if(contains(this.props.snakePositions, new Position(x, y))) className += " snake";
                if(contains(this.props.fruitPositions, new Position(x, y))) className += " apple";

                return <div key={"r" + y + "c" + x} className={className} />;
            }.bind(this));
            return <div key={y} className="row">{cells}</div>;
        }.bind(this));

        return <div className="board">{rows}</div>;
    }
});
