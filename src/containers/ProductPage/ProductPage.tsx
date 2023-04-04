import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAppSelector } from '../../hooks/reduxHooks';

import { Link } from 'react-router-dom';
import { IProductDetail } from '../../types/types';
import { addToCart, onClickPlus, onClickMinus } from '../../store/cartSlice';
import { addTorecentlyViewed } from '../../store/recentViewSlice';

import LinkBack from '../../components/LinkBack/LinkBack';
import SliderThumbs from '../../components/SliderThumbs/SliderThumbs';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';
import Spinner from '../../components/Spinner/Spinner';

import './ProductPage.scss';



const ProductPage:FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const [productInfo, setProductInfo] = useState<IProductDetail>();
    const [productQuanuty, setProductQuanity] = useState<number>(0);
    const [textType, setTextType] = useState<string>('description');
    const [loading, setLoading] = useState<boolean>(false);

    const cartItemsSelector = useAppSelector(state => state.cartItems.cartItems);
    const recentlyViewed = useAppSelector(state => state.recentlyViewed.recentlyViewed);

    const addToRecently = (recent: IProductDetail) => {
        dispatch(addTorecentlyViewed(recent))
    }

    const getProductInfo = () => {
        //request

        setLoading(true);
        const product: IProductDetail = {
            id: Number(id),
            title: 'Апельсиновий сік',
            img: ['https://cbo.org.ua/wp-content/uploads/apelsinoviy-sok2.jpg', 'https://healthapple.info/wp-content/uploads/2020/01/apelsynovyy-sik.jpg'],
            price: 20,
            minQuanityOrder: 13,
            availability: true,
            description: 'Концентрований освітлений апельсиновий сік виготовляється із стиглих, свіжих плодів апельсину різних сортів. Сік має характерний насичений смак і запаху апельсинів містяться такі мінерали як кальцій, залізо, магній та фосфор. Фахівці з ароматерапії переконують, що аромат апельсинів здатний діяти як антидепресант. Ці фрукти сприяють покращення діяльності мозку, пам’яті, підвищують концентрацію уваги. Апельсиновий сік корисно пити дітям та вагітним жінкам, а також людям зі зниженим гемоглобіном',
            characteristics: [
                {name: 'Додатковий сервіс', text: 'Відправка протягом 1-3 днів з моменту оплати. Великі партії товару ( від 1 тони) протягом 4-6 днів'},
                {name: 'Колір', text: 'Продукт має темно-оранжевий колір (в результаті термічної обробки), після відновлення - жовтий'},
                {name: 'Виробник', text: 'Власне виробництво'}
            ]
        };
        setProductInfo(product);
        addToRecently(product);
        setLoading(false);
    } 

    const onCart = () => {
        if(productInfo) {
            dispatch(addToCart({ 
                id: productInfo.id,
                title: productInfo.title,
                img: productInfo.img,
                price: productInfo.price,
                quanity: productInfo.minQuanityOrder,
                minQuanityOrder: productInfo.minQuanityOrder
            }));
        }
    }

    const onPlus = (id: number) => {
        dispatch(onClickPlus(id))
    }

    const onMinus = (id: number) => {
        dispatch(onClickMinus(id))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductInfo();
        const itemQuanity = cartItemsSelector.find(item => item.id === productInfo?.id)?.quanity;
        if(itemQuanity) {
            setProductQuanity(itemQuanity)
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductInfo();
        const itemQuanity = cartItemsSelector.find(item => item.id === productInfo?.id)?.quanity;
        if(itemQuanity) {
            setProductQuanity(itemQuanity)
        }
    }, [id])

    useEffect(() => {
        const itemQuanity = cartItemsSelector.find(item => item.id === productInfo?.id)?.quanity;
        if(itemQuanity) {
            setProductQuanity(itemQuanity)
        }
    }, [id, cartItemsSelector])

    return (
        <section className="product-page">
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/'>Головна</Link>
                    <Link className='bread-crumbs__item' to='/categories'>Категорії</Link>
                    <span className='bread-crumbs__item'>{productInfo?.title}</span>
                </div>
                <LinkBack />
                {loading ? <Spinner /> : (
                    <>
                        <div className='product-page__inner'>
                            <div className="product-page__left">
                                {
                                    productInfo && (
                                        productInfo.img.length === 1 ? (
                                            <img className='product-page__img' src={productInfo.img[0]} alt={productInfo.title} />
                                        ) : (
                                            <SliderThumbs imgs={productInfo.img} />
                                        )
                                    )
                                }
                            </div>
                            <div className="product-page__right">
                                <h1 className='product-page__title'>{productInfo?.title}</h1>
                                <div className='product-page__cart'>
                                    <div className='product-page__price'><span>Ціна: </span> {productInfo?.price} грн</div>
                                    {
                                        productInfo?.availability === true 
                                            ?  <div className='product-page__availability product-page__availability--true'>Є в наявності</div>
                                            :  <div className='product-page__availability product-page__availability--false'>Немає в наявності</div>
                                    }
                                    {productInfo?.availability &&
                                        cartItemsSelector.find(item => item.id === productInfo?.id)
                                            ? (
                                                <>
                                                    <div className='product-page__quanity'>
                                                        <button className='product-page__btn-cart' onClick={() => onMinus(productInfo.id)}>-</button>
                                                            <span className='product-page__num'>{productQuanuty}</span>
                                                        <button className='product-page__btn-cart' onClick={() => onPlus(productInfo.id)}>+</button>
                                                    </div> 
                                                <p className='product-page__min-quanity'>* мінімальна кількість замовлення - {productInfo.minQuanityOrder}</p>
                                                </>
                                            )
                                            : <button onClick={onCart} className='product-page__btn--cart'>Додати в корзину</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='product-page__switch'>
                            <button 
                                className={textType === 'description' ? 'product-page__btn product-page__btn--active' : 'product-page__btn'}
                                onClick={() => setTextType('description')}
                            >
                                Опис
                            </button>
                            <button 
                                className={textType === 'characteristics' ? 'product-page__btn product-page__btn--active' : 'product-page__btn'}
                                onClick={() => setTextType('characteristics')}
                            >
                                Характеристики
                            </button>
                        </div>
                    {
                        textType === 'description' 
                            ?   <p className='product-page__text'>{productInfo?.description}</p>
                            :  (
                                <ul className='product-page__list'>
                                    {
                                        productInfo?.characteristics.map(char => (
                                            <li key={char.name} className='product-page__char'>
                                                <span>{char.name}</span>
                                                —
                                                <span>{char.text}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                    }
                    </>
                )}
                {recentlyViewed.length > 0 && <RecentlyViewed />}
            </div>
        </section>
    )
}

export default ProductPage;