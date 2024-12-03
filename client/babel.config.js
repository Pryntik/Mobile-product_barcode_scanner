module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-flow',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-transform-private-methods',
    ['module:react-native-dotenv', {
      'moduleName': '@env',
      'path': '.env'
    }]  
  ],
};
