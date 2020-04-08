import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';

export default function Home() {
  return (
    <ProductList>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-lacoste-leronde-masculino/12/D66-2774-012/D66-2774-012_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis lacoste</strong>
        <span>R$ 130,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-lacoste-leronde-masculino/12/D66-2774-012/D66-2774-012_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis lacoste</strong>
        <span>R$ 130,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-lacoste-leronde-masculino/12/D66-2774-012/D66-2774-012_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis lacoste</strong>
        <span>R$ 130,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-lacoste-leronde-masculino/12/D66-2774-012/D66-2774-012_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis lacoste</strong>
        <span>R$ 130,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-lacoste-leronde-masculino/12/D66-2774-012/D66-2774-012_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis lacoste</strong>
        <span>R$ 130,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-lacoste-leronde-masculino/12/D66-2774-012/D66-2774-012_zoom1.jpg"
          alt="Tênis"
        />
        <strong>Tênis lacoste</strong>
        <span>R$ 130,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ProductList>
  );
}
