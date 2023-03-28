import { Link } from 'react-router-dom';

import Categories from '../../components/Categories/Categories';
import './CatalogPage.scss';

const CatalogPage = () => {
    return (
        <section className="catalog-page">
            <div className="container">
                <div className="bread-crumbs">
                    <Link className='bread-crumbs__item' to='/'>Головна</Link>
                    <span className='bread-crumbs__item'>Категорії</span>
                </div>
            </div>
            <Categories />
        </section>
    )
}

export default CatalogPage