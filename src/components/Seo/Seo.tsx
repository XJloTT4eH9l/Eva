import { FC } from 'react';
import { Helmet } from "react-helmet-async";

interface SeoProps {
    title: string;
    description: string;
}

const Seo:FC<SeoProps> = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta 
                name="description"
                content={description}   
            />
        </Helmet>
    )
}

export default Seo;