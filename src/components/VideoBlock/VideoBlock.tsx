import { FC, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './VideoBlock.scss';

interface VideoBlockProps {
    title: string;
    video: string;
}

const VideoBlock:FC<VideoBlockProps> = ({ title, video }) => {
    const [ref, inView] = useInView({threshold: 0.3, triggerOnce: true});

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    return (
        <section className="video-block" ref={ref}>
             <div onClick={() => videoRef.current && videoRef.current.play()} className={inView ? 'video-block__container video-block__container--active' : 'video-block__container'}>
                <h2 className='video-block__title'>{title}</h2>
                <video
                    ref={videoRef}
                    className='video-block__video'
                    loop
                    muted 
                    autoPlay
                    playsInline
                >
                    <source src={video} />
                </video>
            </div>
        </section>
    )
}

export default VideoBlock;