if(typeof Array.isArray !== 'undefined') {
    // ...
} else {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
}