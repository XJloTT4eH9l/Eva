import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LinkBack from "../../components/LinkBack/LinkBack";
import Catalog from "../../components/Catalog/Catalog";

const CategoryPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
       <section className="categories-page">
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/'>Головна</Link>
                    <Link className='bread-crumbs__item' to='/categories'>Категорії</Link>
                    <span className='bread-crumbs__item'>Зброжений сік</span>
                </div>
                <LinkBack />
                <h1 className="title">Зброжений сік</h1>
                <Catalog link='fermented-juice-link' />
            </div>
       </section>
    )
}

export default CategoryPage;