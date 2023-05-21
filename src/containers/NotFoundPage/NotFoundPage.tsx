import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';
import './NotFoundPage.scss';

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <section className="not-found">
            <div className="container">
                <h1 className='not-found__title'>404</h1>
                <p className='not-found__text'>{t("error_page.page404")}</p>
                <Link to='/home' className='not-found__link'>{t("nav.to_main")}</Link>
            </div>
            <RecentlyViewed type='main' />
        </section>
    )
}

export default NotFoundPage;