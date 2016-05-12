module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    watch: {
      style: {
        files: ["src/less/**/*.less"],
        tasks: ["less", "cmq", "postcss", "cssmin"],
        options: {
          livereload: true,
        }
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.css": ["src/less/style.less"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
          report: "gzip"
        },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'build/css/*.css',
                        'build/index.html'
                    ]
                },
                options: {
                    watchTask: true,
                }
            }
        }


  });

  grunt.registerTask("build", [
        "browserSync",
        "less",
        "cmq",
        "postcss",
        "cssmin",
        "watch"
  ]);

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');


};
