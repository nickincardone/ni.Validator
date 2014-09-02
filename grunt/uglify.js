module.exports = {
  dist: {
    options: {
      compress: {
        drop_console: false
      }
    },
    files: {
      '<%= distPath %>/niValidator.min.js': [
        '<%= distPath %>/niValidator.js'
      ]
    }
  }
};