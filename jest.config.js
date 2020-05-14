// module.exports = {
//     reporters: [
//       [ 'jest-junit', {
//         outputName: 'output.xml',
//       } ]
//     ]
//   };


  module.exports = {
    reporters: [
      'default',
      [
        'jest-junit',
        {
          includeConsoleOutput: true,
          outputName: 'output.xml',
        },
      ],
    ],
  }