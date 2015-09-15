require.config({
    paths: {
        'jquery': "../lib/jquery/jquery",
        'underscorejs': "../lib/underscorejs/underscore",
        'baconjs': "../lib/baconjs/Bacon",
        'bacon.model': "../lib/bacon.model/dist/bacon.model",
        'bacon.jquery': "../lib/bacon.jquery/dist/bacon.jquery"
    },

    shim: {
        'underscorejs': {
            exports: '_'
        }
    }
});

require(['react', 'Position', 'components/SnakeGame'], function(React, Position, SnakeGame) {
    'use strict';
    $(document).ready(function() {
        React.initializeTouchEvents();
        React.render(<SnakeGame boardSize={new Position(20, 20)} />, document.getElementById('container'));
    });
});
