import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Proposition from '../../components/Proposition/Proposition';

import './HomePage.scss';

const HomePage = () => {
    const discountList = [
        {id: 45, title: 'Зброджений яблучний сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 46, title: 'Зброджений яблучний сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 47, title: 'Зброджений апельсиновий сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 48, title: 'Сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 48, title: 'Сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 48, title: 'Сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'}
    ];
    const newList = [
        {id: 45, title: 'Зброджений яблучний сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 46, title: 'Зброджений яблучний сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 47, title: 'Зброджений апельсиновий сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 48, title: 'Сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
    ];
    return (
        <>
            <Hero /> 
            <Categories />
            <Proposition 
                title='Акції'
                link='link'
                products={discountList}
            />
            <Proposition 
                title='Нові товари'
                link='link'
                products={newList}
            />
        </>
    )
}

export default HomePage;