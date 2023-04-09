import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '../../types/types';
import { API_CATEGORIES } from '../../constants/api';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

import './Categories.scss';

const Categories = () => {
    const [categoriesList, setCategoriesList] = useState<ICategory[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const getCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_CATEGORIES + '?lang_id=1');
            setCategoriesList(res.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategories();
    }, [])

    return (
        <section className="categories">
            <div className="container">
                <h2 className="title">Категорії</h2>
                    {loading ? <Spinner /> : (
                        <ul className="categories__list">
                            {
                                categoriesList?.map((category, i) => (
                                    <Link 
                                        key={category.id} 
                                        className={`categories__item categories__item--${i+1}`} 
                                        to={`/categories/${category.id}`}
                                    >
                                        <div className='categories__block'>
                                            <img className='categories__img' src={category.image} alt={category.title} />
                                            <h3 className='categories__name'>{category.title}</h3>
                                        </div>
                                    </Link>
                                ))
                            }
                        </ul>)
                    }
            </div>
        </section>
    )
}

export default Categories;