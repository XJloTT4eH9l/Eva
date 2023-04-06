export interface IProduct {
    id: number;
    title: string;
    images: string[];
    price: number;
}

export interface ICategory {
    id: number;
    title: string;
    image: string;
}

export type Characteristics = {
    name: string;
    text: string;
}

export interface IProductDetail extends IProduct {
    minQuanityOrder: number;
    characteristics: Characteristics[];
    description: string;
    availability: boolean;
}

export interface ICartItem extends IProduct {
    quanity: number;
    minQuanityOrder: number;
}