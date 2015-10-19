/*
  
  GruntJS task runner for Stratio UI Kit Styleguide

  author: Alejandro Rodriguez (alejandrorodriguez@stratio.com)
  version: 0.1


  Tasks

  grunt sass-watch................Launch the doc task every time one Sass file changed
  grunt dist......................Generate the distributable content of the packate
  grunt default...................Launch the dist task


  Plugins

  time-grunt......................Measure the time used in each subtask
  grunt-contrib-sass..............Sass compiler
  grunt-contrib-watch.............Watcher to automatize tasks if files changed
  grunt-contrib-clean.............Clean files and directories
  grunt-contrib-copy..............Copy files and directories

*/

'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  /*

    Configurable paths for the application

    Note that the bat command needs to be typed exactly as it will be executed, so
    it doesn't support the use of vars inside the command. Then, keep in mind that
    if you change the paths, you should check the bat command to ensure that all 
    will be executed as expected. Check in the "batch" subtask.

  */
  var appConfig = {
    src: 'src',               // Folder of the source
    dist: 'dist',             // Folder of the distributable deliverables.
    styleguide: 'styleguide', // Warning: This name is used to reference files 
                              // and folders.
    vendors: 'vendors',       // Folder of the vendors not included in npm or bower
    npm: 'node_modules',       // Folder of the npm components
    egeoBase: 'node_modules/egeo.ui.base/dist/',        // Folder of the Egeo UI Base Framework
    assets: 'assets'
  };

  grunt.initConfig({
    // Set the paths to be available inside the grunt tasks
    app: appConfig,

    //Sass compile
    sass: {
      dist: {
        options: {
          sourceMap: 'auto',  // The sourcemaps are a way to map the compiled and
                              // minified files to let the browser to know when
                              // inspect code the original file and line we are
                              // inspecting
          outputStyle: 'compressed' // Minify the Sass as much as possible
        },
        files: {
          '<%= app.dist %>/public/<%= app.styleguide %>.css': 'src/<%= app.styleguide %>.scss'
        }
      }
    },

    /* 

      Watch task to automatically refresh the documentation when any Sass file 
      changes in any subfolder.

        Warning: Sometimes it fails on Windows due to the antivirus is checking 
        the files and are blocked. So it is needed create another change in a 
        Sass file to the watch repeat the task and write the compiled 
        documentation properly.

    */
    watch: {
      sass: {
        files: ['<%= app.src %>/*.scss', '<%= app.src %>/**/*.scss'], // Files to watch
        tasks: ['dist'],                                               // Taks to execute when changes detected
        options: {
          spawn: true,  // If the spawn property is established to false, the 
                        // system is faster but also  more prone to fail due to 
                        // it opens a second thread to treat the files and can 
                        // result in the warning explained above.
        },
      },
    },

    /* It cleans the files and folders */
    clean: {
      options: {
        force: true
      },
      dist: ['<%= app.dist %>']
    },

    /* It copies the vendors needed to the documentation be viewed properly. */
    copy: {
      dist: {
        files: [
          // Includes font files within path and its sub-directories
          {expand: true, cwd: '<%= app.npm %>', src: ['angular/*.js', 'angular/*.map', 'angular/*.gzip', '!index.js'], dest: '<%= app.dist %>/public/js'},
          {expand: true, cwd: '<%= app.egeoBase %>', src: ['<%= app.assets %>/**'], dest: '<%= app.dist %>/public'},
          {expand: true, cwd: '<%= app.vendors %>', src: ['**/*'], dest: '<%= app.dist %>'},
          {expand: true, cwd: '<%= app.src %>', src: ['<%= app.assets %>/**'], dest: '<%= app.dist %>/public'}
        ],
      },
    }
  });

  // Load the npm tasks needed
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  /*

    Define the tasks

  */
  grunt.registerTask('sass-watch', [
    'watch:sass'        // Launch the doc task every time a Sass file changes
  ]);

  grunt.registerTask('dist', [
    'clean', // Clean the directory to ensure all files are generated 
             // from scratch
    'copy',  // Copy files needed
    'sass'   // Generate custom CSS to customize the documentation
  ]);

  grunt.registerTask('default', [
    'dist'               // Generate the documentation
  ]);
};
