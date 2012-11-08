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
            fNOP = function () {},
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

(function(window, undefined) {
    'use strict';

    // TODO: create version for require js
    // The Facade encapsulates objectIn according to the description
    // The exposed facade is guaranteed to have exactly the functions described in description.
    window.Facade = function(description, objectIn) {

        var facade, method;

        facade = {};

        for (method in description) {
            if (description.hasOwnProperty(method)) {
                if (! objectIn[method]) {
                    if (window.console && window.console.log) {
                        console.log(" **************** Warning ****************** ");
                        console.log(methodName + " not imlemented for this facade");
                        console.log("+---------------------------------------------+");
                    }
                }
                // Must be a function - bind is needed to enable use of methods other than those on the interface
                facade[method] = objectIn[method].bind(objectIn);
            }
        }

        return facade;
    };

}(window));