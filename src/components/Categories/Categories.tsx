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
        {id: 1, name: 'Зброжений сік', href: '/catalog/fermented-juice', img: zbrozhJuice},
        {id: 2, name: 'Концентровані чаї', href: '/catalog/teas', img: tea},
        {id: 3, name: 'Концентрований сік', href: '/catalog/concentrated-juice', img: concentratedJuice},
        {id: 4, name: 'Фруктові сиропи', href: '/catalog/fruit-syrup', img: jam},
        {id: 5, name: 'Фруктове пюре', href: '/catalog/fruit-puree', img: puree},
        {id: 6, name: 'Фруктово-ягідні соки', href: '/catalog/fruit-berry-juices', img: fruitBerryJuice},
    ];

    return (
        <section className="categories">
            <div className="container">
                <h2 className="title">Категорії</h2>
                <ul className="categories__list">
                    {categoriesList.map((category, i) => (
                        <Link key={category.id} className={`categories__item categories__item--${i+1}`} to={category.href}>
                            <div className='categories__block'>
                                <img className='categories__img' src={category.img} alt={category.name} />
                                <h3 className='categories__name'>{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Categories;