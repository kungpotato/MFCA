module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
    "browser": true,
    "node": true,
    "jasmine": true
  },
  'rules': {
    "linebreak-style": 0,
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    "semi": [2, "never"],
    "no-underscore-dangle": [2, { "allowAfterThis": true ,"allow": ["_id"] }],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
          "every": [ "nesting", "id" ]
      },
      "allowChildren": false
    }],
    "no-unused-expressions": [2, { "allowShortCircuit": true }]
  },
  'globals': {
    "fetch": false
  },
  "parserOptions": {
    "ecmaVersion": 2017
  }
}
