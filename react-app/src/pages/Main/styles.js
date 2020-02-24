import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  /*
    Alternativa de passar as properties para o styled component
   */
  // disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    /* &[disabled] { */
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s infinite linear;
      }
    `};

  /*
  Alternativa mais simples de fazer com que o spinner rotacione,
  sem importar nada a mais, basta apenas definir o componente
  com a classe abaixo
 */
  /* .rotate {
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  } */
`;

export const List = styled.ul`
  margin-top: 30px;
  list-style: none;

  li {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* & + & { */
    & + li {
      border-top: 1px solid #eee;
    }
  }

  a {
    color: #7159c1;
    text-decoration: none;
  }
`;
