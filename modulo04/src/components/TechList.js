import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
  /* 
    Dentro de classes as propriedades default podem ser definidas através do
    comando: static defaultProps = {};
  */

 static defaultProps = {};

  /* 
    O Reach possui o conceito de imutabilidade de estados, ou seja,
    não é possivel modificar um estado existente, devemos sempre criar
    um novo estado a partir do estado atual.

    Com isso toda alteração deve ser feita utilizando a função:
    setState();
   */
  state = {
    newTech: '',
    techs: []
  };

  /* 
    Toda função própria escrita numa classe Component
    deve ser feita utilizando arrow function.

    Isso ocorre para permitir acesso as variáveis através do 'this.', 
    outra funções, etc...
  */
  handleInputChange = (e) => {
      this.setState({newTech: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ 
      /* 
        Criando um novo estado techs, e está utilizando através do this.
        os valores atuais do estado
       */
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    });
  }

  handleDelete = (tech) => {
    /* 
      Propriedades pode ser acessadas dentro de uma classe através de:
      this.props.<nome_da_propriedade>
    */

    this.setState({techs: this.state.techs.filter(e => e !== tech)});
  }

  /* 
    >>>> CLICO DE VIDA DE UM COMPONENT
  */

  /* 
    Método executado assim que um component aparece em tela
    Exemplo, se um component tiver que fazer busca de dados em uma
    api externa e preencher o respectivo estado do mesmo (node backend), esta deve ser feita neste método
   */
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if(techs) {
      this.setState({techs: JSON.parse(techs)});
    }
  }

  /* 
    Executado sempre que houver alterações nas props ou estados
    OBS: O mesmo pode receber como parâmetros os estados anterior as mudanças 
    realizas
  */
  componentDidUpdate(prevProps, prevState) {
    /* 
      Os valores após as atualizações pode ser obtidas
      através de this.props ou this.state
    */
   if(prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
   }
  }

  /* 
    Executado quando o component deixa de existir
  */
  componentWillUnmount() {

  }

  /* 
    Todo component react deve retornar o jsx através do método render
  */
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <ul>
          {/* 
            Propriedade de um componente é tudo aquilo que passando dentro
            da tag de um component
          */}
          {this.state.techs.map(tech => 
            <TechItem 
              key={tech} 
              tech={tech} 
              /* 
                Passando uma função como propriedade para um component
                OBS: A função que manipula um estado de um component deve
                ficar no component onde existe este estado
               */
              onDelete={() => this.handleDelete(tech)}
            />
          )}
        </ul>
        {/* 
          Uma boa prática quando se estar trabalhando com input é armazenar
          o valor deste dentre uma prop chamada value
        */}
        <input 
          type='text' 
          onChange={this.handleInputChange} 
          value={this.state.newTech} 
        />
        <button type='submit' >Enviar</button>
      </form>
    );
  }
}

export default TechList;