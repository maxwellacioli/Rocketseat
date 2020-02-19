module.exports = {
  presets: [
    /* 
      Preset que contém a conversão de código javascript
     */
    "@babel/preset-env",
    /* 
      Preset que converter código react(jsx, por exemplo)
    */
    "@babel/preset-react",
  ],
  plugins: [
    /* 
      Plugin para o babel transpilar propriedades de uma classe.
      Por exemplo: state = {}; (observar o sinal '=');
    */
    "@babel/plugin-proposal-class-properties",
  ]
};