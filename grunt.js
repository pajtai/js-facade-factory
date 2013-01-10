/*global module:false */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        min: {
            facadeFactoryMin: {
                src: ['application/jsff.js'],
                dest: "builds/jsffs.<%= grunt.file.readJSON('package.json').version %>.min.js"
            }
        },

        concat: {
            facadeFactory: {
                src: ['application/jsff.js'],
                dest: "builds/jsffs.<%= grunt.file.readJSON('package.json').version %>.js"
            }
        }
    });


    grunt.registerTask('build', 'concat min');
};
