import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';

export default function Home() {
    return (
        <ProductList>
            <li>
                <img
                    src="https://static.netshoes.com.br/produtos/tenis-adidas-gamecourt-masculino/04/COL-4560-304/COL-4560-304_detalhe1.jpg?resize=280:280"
                    alt="Tênis"
                />
                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="submit">
                    <div>
                        <MdAddShoppingCart size={16} color="#FFF" /> 3
                    </div>
                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
            <li>
                <img
                    src="https://static.netshoes.com.br/produtos/tenis-adidas-gamecourt-masculino/04/COL-4560-304/COL-4560-304_detalhe1.jpg?resize=280:280"
                    alt="Tênis"
                />
                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="submit">
                    <div>
                        <MdAddShoppingCart size={16} color="#FFF" /> 3
                    </div>
                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
            <li>
                <img
                    src="https://static.netshoes.com.br/produtos/tenis-adidas-gamecourt-masculino/04/COL-4560-304/COL-4560-304_detalhe1.jpg?resize=280:280"
                    alt="Tênis"
                />
                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="submit">
                    <div>
                        <MdAddShoppingCart size={16} color="#FFF" /> 3
                    </div>
                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
            <li>
                <img
                    src="https://static.netshoes.com.br/produtos/tenis-adidas-gamecourt-masculino/04/COL-4560-304/COL-4560-304_detalhe1.jpg?resize=280:280"
                    alt="Tênis"
                />
                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="submit">
                    <div>
                        <MdAddShoppingCart size={16} color="#FFF" /> 3
                    </div>
                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
            <li>
                <img
                    src="https://static.netshoes.com.br/produtos/tenis-adidas-gamecourt-masculino/04/COL-4560-304/COL-4560-304_detalhe1.jpg?resize=280:280"
                    alt="Tênis"
                />
                <strong>Tênis muito legal</strong>
                <span>R$129,90</span>

                <button type="submit">
                    <div>
                        <MdAddShoppingCart size={16} color="#FFF" /> 3
                    </div>
                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
        </ProductList>
    );
}
