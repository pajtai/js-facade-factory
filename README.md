js-facade-factory
=================

### [Demo](http://pajtai.github.com/js-facade-factory/tests/sample/)

Releases:

* Developer
    * [0.0.1](http://pajtai.github.com/js-facade-factory/builds/jsff.0.0.1.js)
    * [0.0.2](http://pajtai.github.com/js-facade-factory/builds/jsff.0.0.2.js)
* Production
    * [0.0.2](http://pajtai.github.com/js-facade-factory/builds/jsff.0.0.2.min.js)
    

A way to create facades that are guaranteed to have only the methods listed in their descriptions. This is a useful
collaboration or organizational tool.

Sample usage:

In a shared file / module, describe the facade that will be used by multiple imlementations. The facade is described
using key value pairs. The keys are the method names, and the values are the descriptions of the functionality.

```javascript
var playerFacade = {
    play: 'method to play movies',
    stop: 'method to stop movies'
};
```

Create a facade implelemntation. Helper methods and fields may be used and will be functional, but they will not be
exposed as part of the facade; they are essentially private.

```javascript
var htmlPlayer = {
    time: 0,
    play: function() { ++this.time; this.helper(); return this; },
    stop: function() { console.log("html stop"); return this; },
    helper: function() { console.log("html play and play helper fired - time is now: " + this.time); },
};
```

Now create the facade using its description and implementation

```javascript
var player = new Facade(playerFacade, htmlPlayer);
```

Use it:

```javascript
player.play().stop();
```

Now you can use the same code that relies on a `player` for different types of players in different environments.

```javascript
// Create a flash player
var player = new Facade(playerFacade, flashPlayer);

// Or create an html player
var player = new Facade(playerFacade, htmlPlayer);

// Use the player without caring which one you have.
player.play().stop();
```

### Contributors
* [Peter Ajtai](https://github.com/pajtai)
* [Jonathan Waltner](https://github.com/uselessinfo)

### Changelog
0.0.1 - 2012 Nov 09 - Initial release
0.0.2 - 2013 Jan 10 - Support for properties