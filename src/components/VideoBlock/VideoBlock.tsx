import { FC } from 'react';
import video from '../../assets/video/apples.mp4';
import './VideoBlock.scss';

interface VideoBlockProps {
    title: string;
    video: string;
}

const VideoBlock:FC<VideoBlockProps> = ({title, video}) => {
    return (
        <section className="video-block">
             <div className='video-block__container'>
                <h2 className='video-block__title'>{title}</h2>
                <video
                    className='video-block__video'
                    loop
                    muted 
                    autoPlay
                >
                    <source src={video} />
                </video>
            </div>
        </section>
    )
}

export default VideoBlock;