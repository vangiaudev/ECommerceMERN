import products from 'data/products';
import React from 'react'
import { Carousel, Container, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
const ProductBanner = () => {
  return (
    <Container style={{textAlign: "center"}}>
      <Carousel pause='hover'className='bg-primary'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 style={{color: '#333'}}>{product.name} ( {product.price} VNĐ)</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
    </Container>
  )
}

export default ProductBanner