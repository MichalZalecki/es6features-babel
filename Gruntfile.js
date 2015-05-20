module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        clean: {
            path: ['src/es5']
        },
        babel: {
            options: {
                sourceMap: false,
                // modules: "common", // by default use CommonJS modules
                // modules: "umd",    // use UMD modules
                // modules: "amd",    // use AMD modules
            },
            dist: {
                files: {
                    'src/es5/arrow-functions.js': 'src/es6/arrow-functions.js',
                    'src/es5/classes.js': 'src/es6/classes.js',
                    'src/es5/data-structures.js': 'src/es6/data-structures.js',
                    'src/es5/default-parameters.js': 'src/es6/default-parameters.js',
                    'src/es5/enhanced-object-literals.js': 'src/es6/enhanced-object-literals.js',
                    'src/es5/generators.js': 'src/es6/generators.js',
                    'src/es5/iterators-for-of.js': 'src/es6/iterators-for-of.js',
                    'src/es5/let-and-const.js': 'src/es6/let-and-const.js',
                    'src/es5/modules/math.js': 'src/es6/modules/math.js',
                    'src/es5/modules/person.js': 'src/es6/modules/person.js',
                    'src/es5/modules.js': 'src/es6/modules.js',
                    'src/es5/numeric-literals.js': 'src/es6/numeric-literals.js',
                    'src/es5/promises.js': 'src/es6/promises.js',
                    'src/es5/rest-parameters.js': 'src/es6/rest-parameters.js',
                    'src/es5/spread.js': 'src/es6/spread.js',
                    'src/es5/symbols.js': 'src/es6/symbols.js',
                    'src/es5/template-literals.js': 'src/es6/template-literals.js'
                }
            }
        },
        browserify: {
            dist: {
                src: ['src/es5/*.js', '!src/es5/bundle.js'],
                dest: 'src/es5/bundle.js',
                options: {
                    transform: [
                        // 'deamdify' // needed when working with AMD modules
                    ]
                }
            }
        },
        karma: {
          unit: {
            configFile: 'karma.conf.js',
            options: {
              files: [
                'node_modules/grunt-babel/node_modules/babel-core/browser-polyfill.js',
                'src/es5/bundle.js'
              ]
            }
          }
        },
    });

    grunt.registerTask('default', ['babel', 'browserify', 'karma']);
}
