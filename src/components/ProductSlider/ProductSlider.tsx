import { FC } from 'react';
import { IProduct } from '../../types/types';
import Product from '../Product/Product';
import Slider from 'react-slick';

import './ProductSlider.scss';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

interface ProductSliderProps {
    products: IProduct[];
}

const ProductSlider:FC<ProductSliderProps> = ({ products }) => {
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        dontAnimate: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        waitForAnimate: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1.4,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      };
    return (
        <Slider {...sliderSettings}>
            {products.map(product => (
                <Product
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    img={product.images}
                    price={product.price} 
                />
            ))}
        </Slider>
    )   
}

const NextArrow:FC = (props: any) => {
    const { className, style, onClick } = props; 
    return (
        <div 
            className={className}
            style={{...style, display:'block'}}
            onClick={onClick}
        >
            ›
        </div>
    )
}

const PrevArrow:FC = (props: any) => {
    const { className, style, onClick } = props; 
    return (
        <div 
            className={className}
            style={{...style, display:'block'}}
            onClick={onClick}
        >
            ‹
        </div>
    )
}

export default ProductSlider;