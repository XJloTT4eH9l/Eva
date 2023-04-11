import { FC } from 'react';
import mark from '../../assets/img/mark.svg';
import './Notification.scss';

interface NotificationProps {
    text: string;
    productAdded: boolean;
}

const Notification:FC<NotificationProps> = ({ text, productAdded }) => {
    return (
        <div className={productAdded ? "notification notification--active" : "notification"}>
            <img className='notification__img' src={mark} alt='Додано'/>
            <p className="notification__text">{text}</p>
        </div>
    )
}

export default Notification;