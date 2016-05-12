module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    sass: {
      style: {
        files: {
          "css/style.css": ["sass/style.scss"]
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
        src: "css/style.css"
      }
    },

    cmq: {
      style: {
        files: {
          "css/style.css": ["css/style.css"]
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
          "css/style.min.css": ["css/style.css"]
        }
      }
    },

    watch: {
      style: {
        files: ["sass/**/*.scss"],
        tasks: ["sass", "cmq", "postcss", "cssmin"],
        options: {
          livereload: true,
        }
      }
    }
  });

  grunt.registerTask("build", [
        "sass",
        "cmq",
        "postcss",
        "cssmin"
  ]);


};






