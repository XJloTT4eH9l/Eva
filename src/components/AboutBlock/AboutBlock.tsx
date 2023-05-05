import { useInView } from 'react-intersection-observer';
import aboutImg from '../../assets/img/about-company.jpg';
import './AboutBlock.scss';

const AboutBlock = () => {
    const [ref, inView] = useInView({threshold: 0.5});
    return (
        <div className="about-block" ref={ref}>
            <div className="container">
                <div className={inView ? "about-block__inner about-block__inner--active" : "about-block__inner"}>
                    <div className="about-block__content">
                        <h2 className='about-block__title'>Про компанію</h2>
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