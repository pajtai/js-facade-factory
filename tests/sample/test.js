
var playerFacade = {
    play: 'method to play movies',
    stop: 'method to stop movies'
};

var remoteFacade = {
    on: 'turn on',
    off: 'turn off'
};

// An implelemntation of the interface
var htmlPlayer = {
    play: function() { console.log("html play"); this.helper(); return this; },
    stop: function() { console.log("html stop"); return this; },
    helper: function() { console.log("player helper fired"); }
};

var remote = {
    on: function() { this.helper(); console.log("remote on"); return this; },
    off: function() { console.log("remote off"); return this; }
};


// -----------------------------------------

// To implelemnt an interface:
var player = Facade(playerFacade, htmlPlayer).mixIn(remoteFacade, remote);


player.on().play().stop().off();

// Helper is not directly accessible: (uncomment to check)
console.log(typeof player.helper);
