'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var gateway = require('gateway');
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'src',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '<%= yeoman.app %>/*.php',
                    '{.tmp,<%= yeoman.app %>}/assets/styles/**/*.css',
                    '{.tmp,<%= yeoman.app %>}/js/**/*.js',
                    '<%= yeoman.app %>/assets/images/**/*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/js/templates/**/*.{tpl,ejs,mustache,hbs}',
                    'test/spec/**/*.js'
                ]
            },
            jst: {
                files: [
                    '<%= yeoman.app %>/js/templates/*.ejs'
                ],
                tasks: ['jst']
            },
            test: {
                files: ['<%= yeoman.app %>/js/**/*.js', 'test/spec/**/*.js'],
                tasks: ['test:true']
            }
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            gateway(__dirname + '/' + yeomanConfig.app, {
                                '.php': 'php-cgi'
                            }),
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            test: {
                path: 'http://localhost:<%= connect.test.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/**/*.js',
                '!<%= yeoman.app %>/js/vendor/*',
                'test/spec/**/*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%= yeoman.app %>/js',
                    optimize: 'none',
                    paths: {
                        'jquery': '../../<%= yeoman.app %>/com/vendor/jquery/dist/jquery',
                        'underscore': '../../<%= yeoman.app %>/com/vendor/underscore/underscore',
                        'backbone': '../../<%= yeoman.app %>/com/vendor/backbone/backbone',
                        'bootstrap': '../../<%= yeoman.app %>/com/vendor/bootstrap/dist/js/bootstrap',
                        'json2': '../../<%= yeoman.app %>/com/vendor/json2/json2',
                        'modernizr': '../../<%= yeoman.app %>/com/vendor/modernizr/modernizr',
                        'requirejs-text': '../../<%= yeoman.app %>/com/vendor/requirejs-text/text',
                        'requirejs': '../../<%= yeoman.app %>/com/vendor/requirejs/require'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            src: ['<%= yeoman.app %>/index.html'],
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/*.html', '<%= yeoman.dist %>/*.php', '<%= yeoman.dist %>/js/*.js'],
            css: ['<%= yeoman.dist %>/assets/styles/**/*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/assets/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/assets/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/assets/styles/main.css': [
                        '<%= yeoman.app %>/assets/styles/**/*.css'
                    ]
                },
                options: {
                    keepSpecialComments: 0
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', '*.php'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt,xml}',
                        '.htaccess',
                        'assets/images/**/*.{webp,gif}',
                        'assets/fonts/**/*.*',
                        'api/**/*.*',
                        'assets/styles/ext/**/*.*'
                    ]
                }]
            },
            home: {
                src: '<%= yeoman.dist %>/index.html',
                dest: 'index.html',
                options:{
                    process: function (content, srcpath) {
                        content = content.replace(/("com)/g,'"dist/com');
                        content = content.replace(/("js)/g,'"dist/js');
                        content = content.replace(/("assets)/g,'"dist/assets');
                        return content;
                      }
                }
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/js/main.js'
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '.tmp/js/templates.js': ['<%= yeoman.app %>/js/templates/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/js/**/*.js',
                        '<%= yeoman.dist %>/assets/styles/**/*.css',
                        // '<%= yeoman.dist %>/assets/images/**/*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/assets/styles/fonts/**/*.*',
                    ]
                }
            }
        },
        replace: {
            urls: {
                src: ['<%= yeoman.dist %>/*.php', '<%= yeoman.dist %>/**/*.php'],
                overwrite: true,
                replacements: []
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= yeoman.dist %>.zip',
                    pretty: true
                },
                files: [{
                    src: ['<%= yeoman.dist %>/**'],
                    dot: true
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'ie >= 8', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    src: '<%= yeoman.dist %>/assets/styles/**/*.css'
                }]
            }
        },
    });

    grunt.registerTask('createDefaultTemplate', function() {
        grunt.file.write('.tmp/js/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'jst',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', function(isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'connect:test',
            'mocha',
        ];

        if (!isConnected) {
            return grunt.task.run(testTasks);
        } else {
            // already connected so not going to connect again, remove the connect:test task
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
            return grunt.task.run(testTasks);
        }
    });

    grunt.registerTask('createHome', function() {
        grunt.task.run('copy:home');
    });

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'replace',
        'rev',
        'usemin',
        // 'compress',
        'copy:home'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};