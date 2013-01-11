/*global window:true */

// We rely on bind, make sure it's there
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

(function (window) {
    'use strict';

    // TODO: create version for require js
    // The Facade encapsulates objectIn according to the description
    // The exposed facade is guaranteed to have exactly the functions described in description.
    window.Facade = function (description, objectIn) {

        var facade, mixIn, warn, self;

        facade = {};

        self = {};

        warn = function (message) {
            if (window.console && window.console.log) {
                console.log(" **************** Warning ****************** ");
                console.log(message);
                console.log("+---------------------------------------------+");
            }
        };

        mixIn = function (description, objectIn) {
            var property, method;

            for (property in objectIn) {

                if (objectIn.hasOwnProperty(property)) {

                    // Only apply .bind() to object methods
                    if (objectIn[property] && objectIn[property].bind) {
                        self[property] = objectIn[property].bind(self);

                    } else {
                        self[property] = objectIn[property];

                    }
                }
            }

            for (method in description) {

                if (description.hasOwnProperty(method)) {

                    if (!objectIn[method]) {
                        warn(method + " not implemented for this facade");
                    }

                    if ('mixIn' === method) {
                        warn(method + " is being used as a faced method name. This means you cannot mixIn anymore " +
                            "facades.")
                    }

                    // Must be a function - bind is needed to enable use of methods other than those on the interface
                    facade[method] = objectIn[method].bind(self);
                }
            }

            return facade;
        };

        facade.mixIn = mixIn;

        facade.mixIn(description, objectIn);

        return facade;
    };

}(window));