
Huge community of plugins

Tasks are independent and run in sequential order

    grunt.registerTask('build', ['clean', 'bower', 'browserify', 'concat', 'copy']);

Each task access the file separately

