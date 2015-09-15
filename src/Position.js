define(function() {
    function Position(x, y) {
        this.x = x;
        this.y = y;
        this.equals = function (p) {
            return this.x === p.x && this.y === p.y;
        };
        this.add = function (p) {
            return new Position(this.x + p.x, this.y + p.y);
        };
        this.mod = function (size) {
            return new Position((this.x + size.x) % size.x, (this.y + size.y) % size.y);
        };
    }

    Position.randomPosition = function(size) {
        return new Position(
            Math.floor(Math.random() * size.x),
            Math.floor(Math.random() * size.y)
        );
    };

    Position.rotateRight = function(pos) {
        return new Position(-pos.y, pos.x);
    };

    Position.rotateLeft = function(pos) {
        return new Position(pos.y, -pos.x);
    };

    return Position;
});