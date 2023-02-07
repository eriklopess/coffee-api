import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Product from "../../interfaces/Product";
import {
  Card,
  CardBody,
  CardBottom,
  CardButton,
  CardImage,
  CardPrice,
  CardStars,
  CardText,
  CardTitle,
} from "./style";

function ProductCard({product}: { product: Product }) {
  const dispatch = useDispatch();
  const addToCart = (product2: Product) => {
    dispatch(addToCart(product2));
  };
  return (
    <Card>
      <CardImage
        src="https://media.cotabest.com.br/media/sku/cafe-torrado-e-moido-extra-forte-em-po-vacuo-500g-cafe-pele-un"
        alt=""
      />
      <CardBody>
        <CardText>
          <CardTitle>{`${product.name} ${product.description}`}</CardTitle>
        </CardText>
        <CardStars>
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <BsStar />
          <span>
            (3.6)
          </span>
        </CardStars>
        <CardPrice>R$ 10,00</CardPrice>
        <CardBottom>
          <CardButton>Adicionar ao Carrinho</CardButton>
        </CardBottom>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
