import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Proposition from '../../components/Proposition/Proposition';

import './HomePage.scss';

const HomePage = () => {
    const discountList = [
        {id: 45, title: 'Яблучний сік', price: 15.00, img: ['https://cdn.segodnya.ua/i/original/media/image/5d5/a50/dce/5d5a50dce8785.jpg.webp']},
        {id: 46, title: 'Апельсиновий сік', price: 18.00, img: ['https://cbo.org.ua/wp-content/uploads/apelsinoviy-sok2.jpg']},
        {id: 47, title: 'Персиковий сік', price: 20.00, img: ['https://zelensad.com/upload/iblock/df0/df0c1cadb14ba8b4e529a8fe0e335d9b.jpg']},
        {id: 48, title: 'Гранатовий Сік', price: 23.00, img: ['https://shuba.life/static/content/thumbs/740x493/f/57/khncn4---c740x493x50px50p-c740x493x50px50p-up--63b2d6bfdeb759b6713d0967ff2b457f.jpg']},
        {id: 48, title: 'Сік', price: 15.00, img: ['https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg']},
        {id: 48, title: 'Сік', price: 15.00, img: ['https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg']}
    ];
    const newList = [
        {id: 45, title: 'Яблучний сік', price: 15.00, img: ['https://cdn.segodnya.ua/i/original/media/image/5d5/a50/dce/5d5a50dce8785.jpg.webp']},
        {id: 46, title: 'Апельсиновий сік', price: 18.00, img: ['https://cbo.org.ua/wp-content/uploads/apelsinoviy-sok2.jpg']},
        {id: 47, title: 'Персиковий сік', price: 20.00, img: ['https://zelensad.com/upload/iblock/df0/df0c1cadb14ba8b4e529a8fe0e335d9b.jpg']},
        {id: 48, title: 'Гранатовий Сік', price: 23.00, img: ['https://shuba.life/static/content/thumbs/740x493/f/57/khncn4---c740x493x50px50p-c740x493x50px50p-up--63b2d6bfdeb759b6713d0967ff2b457f.jpg']},
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