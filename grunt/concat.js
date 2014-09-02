module.exports = {
  dev: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/validator_module.js',
      '<%= jsPath %>/**/*.js'
    ],
    dest: '<%= distPath %>/niValidator.js'
  }
};
