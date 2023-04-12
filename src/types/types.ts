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

export type NewPrice = {
    new_price: number;
}

export interface IProductDetail extends IProduct {
    minQuanityOrder: number;
    characteristics: Characteristics[];
    description: string;
    availability: boolean;
    promo?: NewPrice;
}

export interface ICartItem extends IProduct {
    quanity: number;
    minQuanityOrder: number;
    promo?: NewPrice
}