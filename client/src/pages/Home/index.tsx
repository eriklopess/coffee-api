import React from 'react'
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import Product from '../../interfaces/Product';
import { HomeContainer, ProductsContainer } from './style';

const product: Product = {
    _id: '1',
    name: 'Café',
    description: ' de alta qualidade asddasadsdds',
    price: 10.00,
    image: 'https://www.cafedaserra.com.br/wp-content/uploads/2019/10/caf%C3%A9-da-serra-1.jpg',
    category: 'Café',
    stock: 10,
}

const Home: React.FC = () => {
  return (
    <HomeContainer>
        <Header />
        <ProductsContainer>
            {
                [1,2,3,4,5,6,7,8,9,10].map((item) => (
                    <ProductCard product={product} />
                ))
            }
        </ProductsContainer>
    </HomeContainer>
  )
}

export default Home;
 