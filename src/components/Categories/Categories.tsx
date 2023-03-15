import { Link } from 'react-router-dom';

// import images
import zbrozhJuice from '../../assets/img/juice.png';
import tea from '../../assets/img/tea.png';
import fruitBerryJuice from '../../assets/img/fruit-berry-juice.png';
import concentratedJuice from '../../assets/img/grape-juice.png';
import jam from '../../assets/img/jam.png';
import puree from '../../assets/img/sauce.png';

import './Categories.scss';

const Categories = () => {
    const categoriesList = [
        {id: 1, name: 'Зброжений сік', href: '/categories/zbrozheniy-sik', img: zbrozhJuice},
        {id: 2, name: 'Концентровані чаї', href: '/categories/teas', img: tea},
        {id: 3, name: 'Концентрований сік', href: '/categories/concentrated-juice', img: concentratedJuice},
        {id: 4, name: 'Фруктові сиропи', href: '/categories/fruit-syrup', img: jam},
        {id: 5, name: 'Фруктове пюре', href: '/categories/fruit-puree', img: puree},
        {id: 6, name: 'Фруктово-ягідні соки', href: '/categories/fruit-berry-juices', img: fruitBerryJuice}
    ];

    return (
        <section className="categories">
            <div className="container">
                <h2 className="title">Категорії</h2>
                <ul className="categories__list">
                    {categoriesList.map(category => (
                        <li key={category.id} className='categories__item'>
                            <Link className='categories__link' to={category.href}>
                                <img className='categories__img' src={category.img} alt={category.name} />
                                <h3 className='categories__name'>{category.name}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Categories;