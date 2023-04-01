export interface IProduct {
    id: number;
    title: string;
    img: string[];
    price: number;
}

export interface ICategory {
    id: number;
    name: string;
    img: string;
}

type Characteristics = {
    name: string,
    text: string
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