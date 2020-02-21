import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 36px;
  color: ${props => (props.error ? '#F00' : '#00F')};
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  small {
    font-size: 10px;
    color: #999;
  }
`;
