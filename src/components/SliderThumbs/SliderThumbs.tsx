import { FC, useState } from 'react';
import './SliderThumbs.scss';

interface SliderThumbsProps {
    imgs: string[];
}

const SliderThumbs:FC<SliderThumbsProps> = ({ imgs }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="slider-container">
            <div className="slider-main">
                {imgs.map((image, index) => (
                <div
                    key={index}
                    className={`slider-slide ${index === activeIndex ? 'active' : ''}`}
                >
                    <img src={image} alt={image} />
                </div>
                ))}
            </div>
            <div className="slider-thumbnails">
                {imgs.map((image, index) => (
                <div
                    key={index}
                    className={`slider-thumbnail ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                >
                    <img src={image} alt={image} />
                </div>
                ))}
            </div>
    </div>
    )
}

export default SliderThumbs