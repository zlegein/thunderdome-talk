
```grunt.initConfig({
      clean: {
        src: ['build/app.js', 'build/vendor.js']
      },

      copy: {
        files: [{
          src: 'build/app.js',
          dest: 'build/dist/app.js'
        }]
      }

      concat: {
        'build/app.js': ['build/vendors.js', 'build/app.js']
      }```
