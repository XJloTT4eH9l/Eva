import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Characteristics } from '../../types/types';

import './ProductInfo.scss';

interface ProductInfoProps {
    description: string;
    characteristics: Characteristics[];
}

const ProductInfo:FC<ProductInfoProps> = ({ description, characteristics }) => {
    const { t } = useTranslation();
    const [textType, setTextType] = useState<string>('description');

    return (
        <section className="product-info">
            <div className='product-info__switch'>
                <button
                    className={textType === 'description' ? 'product-info__btn product-info__btn--active' : 'product-info__btn'}
                    onClick={() => setTextType('description')}
                >
                    {t("product_page.description")}
                </button>
                <button
                    className={textType === 'characteristics' ? 'product-info__btn product-info__btn--active' : 'product-info__btn'}
                    onClick={() => setTextType('characteristics')}
                >
                    {t("product_page.characteristics")}
                </button>
            </div>
            {
                textType === 'description'
                    ? (<div className='product-info__text-container'>
                        <p className='product-info__text'>{description}</p>
                    </div>)
                    : (
                        <ul className='product-info__list'>
                            {
                                characteristics.map(char => (
                                    <li key={char.name} className='product-info__char'>
                                        <div className='product-info__lable'>
                                            <span>{char.name}</span>
                                        </div>
                                        <div className='product-info__value'>
                                            <span>{char.text}</span>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
            }
        </section>
    )
}

export default ProductInfo;