import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import aboutImg from '../../assets/img/about-company.jpg';
import './AboutBlock.scss';

const AboutBlock = () => {
    const { t } = useTranslation();
    const innerWidth = window.innerWidth;
    const [ref, inView] = useInView({threshold: innerWidth < 900 ? 0.1 : 0.5, triggerOnce: true});
    return (
        <div className="about-block" ref={ref}>
            <div className="container">
                <div className={inView ? "about-block__inner about-block__inner--active" : "about-block__inner"}>
                    <div className="about-block__content">
                        <h3 className='about-block__title'>{t("about_page.our_company")}</h3>
                        <p className='about-block__text'>Наша компанія займається виробництвом свіжих соків з натуральних інгредієнтів. Ми працюємо з місцевими фермерами та підприємствами, щоб забезпечити найвищу якість і свіжість наших продуктів.</p>
                        <p className='about-block__text'>У нашому асортименті є широкий вибір соків, від класичних яблучних і апельсинових до екзотичних смаків, таких як манго і гуава. Ми ставимо на перше місце якість та смак наших продуктів, тому ми не використовуємо консерванти, барвники або смакові підсилювачі.</p>
                    </div>
                    <img className='about-block__img' src={aboutImg} alt='About company' />
                </div>
            </div>
        </div>
    )
}

export default AboutBlock;