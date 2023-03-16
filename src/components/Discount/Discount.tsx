import Product from '../Product/Product';
import './Discount.scss';

const Discount = () => {
    const discountList = [
        {id: 45, title: 'Зброджений яблучний сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 46, title: 'Зброджений яблучний сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 47, title: 'Зброджений апельсиновий сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
        {id: 48, title: 'Сік', price: 15.00, img: 'https://vitamin2015.com.ua/image/cache/catalog/product/1103712194/1-580x580.jpg'},
    ];
    return (
        <section className="discount">
            <div className="container">
                <h2 className="title">Акція</h2>
                <ul className="discount__list">
                    {discountList.map(item => (
                        <Product
                            id={item.id}
                            title={item.title}
                            img={item.img}
                            price={item.price} 
                        />
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Discount;