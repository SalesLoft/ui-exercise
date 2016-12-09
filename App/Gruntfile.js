module.exports = function(grunt) {
    // Default task(s).
    grunt.registerTask('default', ['jshint','ngtemplates', 'concat', 'sass']);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            dist: {
                src: [
                    'node_modules/angular/angular.min.js',
                    'js/**/*.js',
                    'build/app.templates.js'
                ],
                dest: 'build/app.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/**/*.js'],
            options: {
                globals: {
                    angular: true
                }
            }
        },
        sass: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'stylesheets',
                    src: ['*.scss'],
                    dest: 'build',
                    ext: '.css'
                }]
            }
        },
        ngtemplates:  {
            app:        {
                src:      'js/**/*.html',
                dest:     'build/app.templates.js'
            }
        }
    });

    require('load-grunt-tasks')(grunt);



};