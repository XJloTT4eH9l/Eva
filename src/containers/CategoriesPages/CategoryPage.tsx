import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IProduct, ICategory } from '../../types/types';

import LinkBack from "../../components/LinkBack/LinkBack";
import Catalog from "../../components/Catalog/Catalog";
import Spinner from '../../components/Spinner/Spinner';

//img
import zbrozhJuice from '../../assets/img/juice.png';
import tea from '../../assets/img/tea.png';
import fruitBerryJuice from '../../assets/img/fruit-berry-juice.png';
import concentratedJuice from '../../assets/img/grape-juice.png';
import jam from '../../assets/img/jam.png';
import puree from '../../assets/img/sauce.png';

import './CategoryPage.scss';

const CategoryPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState<IProduct[]>();
    const [categories, setCategories] = useState<ICategory[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const getCategories = () => {
        // request
        setCategories([
            {id: 1, name: 'Зброжений сік', img: zbrozhJuice},
            {id: 2, name: 'Концентровані чаї', img: tea},
            {id: 3, name: 'Концентрований сік', img: concentratedJuice},
            {id: 4, name: 'Фруктові сиропи', img: jam},
            {id: 5, name: 'Фруктове пюре', img: puree},
            {id: 6, name: 'Фруктово-ягідні соки', img: fruitBerryJuice},
        ])
    }

    const getProducts = (link: string) => {
        console.log(link);
        // request
        setProducts([
            {id: 45, title: 'Яблучний сік', price: 15.00, img: ['https://cdn.segodnya.ua/i/original/media/image/5d5/a50/dce/5d5a50dce8785.jpg.webp']},
            {id: 46, title: 'Апельсиновий сік', price: 18.00, img: ['https://cbo.org.ua/wp-content/uploads/apelsinoviy-sok2.jpg']},
            {id: 47, title: 'Персиковий сік', price: 20.00, img: ['https://zelensad.com/upload/iblock/df0/df0c1cadb14ba8b4e529a8fe0e335d9b.jpg']},
            {id: 48, title: 'Гранатовий Сік', price: 23.00, img: ['https://shuba.life/static/content/thumbs/740x493/f/57/khncn4---c740x493x50px50p-c740x493x50px50p-up--63b2d6bfdeb759b6713d0967ff2b457f.jpg']},
        ])
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        getProducts(`${id}`);
        getCategories();
        setLoading(false);
    }, [])

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     setLoading(true);
    //     getProducts(`${id}`);
    //     getCategories();
    //     setLoading(false);
    // }, [id])
    return (
       <section className="categories-page">
            <div className="container">
                {loading ? <Spinner /> : (
                    <>
                        <div className="bread-crumbs">
                            <Link className='bread-crumbs__item' to='/'>Головна</Link>
                            <Link className='bread-crumbs__item' to='/categories'>Категорії</Link>
                            <span className='bread-crumbs__item'>{categories?.filter(item => item.id === Number(id))[0].name}</span>
                        </div>
                        <LinkBack />
                        <h1 className="title">{categories?.filter(item => item.id === Number(id))[0].name}</h1>
                        <Catalog products={products} setProducts={setProducts} />
                    </>
                )}
            </div>
       </section>
    )
}

export default CategoryPage;