define(function(require) {
    var React = require('react');
    var _ = require('underscorejs');

    var Position = require('Position');
    var tools = require('tools');

    return React.createClass({
        propTypes: {
            snakePositions: React.PropTypes.arrayOf(Position).isRequired,
            fruitPositions: React.PropTypes.arrayOf(Position).isRequired,
            size: React.PropTypes.instanceOf(Position).isRequired
        },

        render: function () {
            var rows = _.range(this.props.size.y).map(function (y) {
                var cells = _.range(this.props.size.x).map(function (x) {
                    var className = "cell";
                    if (tools.contains(this.props.snakePositions, new Position(x, y))) className += " snake";
                    if (tools.contains(this.props.fruitPositions, new Position(x, y))) className += " fruit";

                    return <div key={"r" + y + "c" + x} className={className}/>;
                }.bind(this));
                return <div key={y} className="row">{cells}</div>;
            }.bind(this));

            return <div className="board">{rows}</div>;
        }
    });
});
