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
                    'dist/arrow-functions.js': 'src/arrow-functions.js',
                    'dist/classes.js': 'src/classes.js',
                    'dist/data-structures.js': 'src/data-structures.js',
                    'dist/default-parameters.js': 'src/default-parameters.js',
                    'dist/enhanced-object-literals.js': 'src/enhanced-object-literals.js',
                    'dist/generators.js': 'src/generators.js',
                    'dist/iterators-for-of.js': 'src/iterators-for-of.js',
                    'dist/let-and-const.js': 'src/let-and-const.js',
                    'dist/modules/math.js': 'src/modules/math.js',
                    'dist/modules/person.js': 'src/modules/person.js',
                    'dist/modules.js': 'src/modules.js',
                    'dist/numeric-literals.js': 'src/numeric-literals.js',
                    'dist/promises.js': 'src/promises.js',
                    'dist/rest-parameters.js': 'src/rest-parameters.js',
                    'dist/spread.js': 'src/spread.js',
                    'dist/symbols.js': 'src/symbols.js',
                    'dist/template-literals.js': 'src/template-literals.js'
                }
            }
        },
        browserify: {
            dist: {
                src: ['dist/*.js', '!dist/bundle.js'],
                dest: 'dist/bundle.js',
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
                'dist/bundle.js'
              ]
            }
          }
        },
    });

    grunt.registerTask('default', ['babel', 'browserify', 'karma']);
}
