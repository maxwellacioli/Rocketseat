import React from 'react';
import PropTypes from 'prop-types';

/* 
  As propriedades devem ser passadas no objet props
*/
function TechItem({ tech, onDelete }) {
  /* 
    Acima foi feita um desestruturação do objeto props. 
    Uma segunda alternativa seria, fazer props.tech
  */
  return (
    <li>
      {tech}
      <button onClick={onDelete} type='button' >Remover</button>
    </li>
  );
}

/* 
  Quando uma propriedade não é passada num component,
  podemos definir um valor default para esta através do método
  defaultProps do component
*/
TechItem.defaultProps = {
  tech: 'Default',
};

/* 
  Para definir os tipos das propriedades devemos utilizar a lib
  prop-types
*/
TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};

export default TechItem;