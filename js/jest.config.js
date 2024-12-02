// For every .js file in the src directory, require at least 80% line coverage.
module.exports = {
    coverageThreshold: {
      './src/*.js': {
        lines: 80
      }
    }
  }