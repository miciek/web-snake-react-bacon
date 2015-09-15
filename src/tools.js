define(function() {
    return {
        contains: function(arr, x) {
            for (var i in arr) {
                if (arr[i].equals(x)) return true;
            }
            return false;
        }
    };
});
