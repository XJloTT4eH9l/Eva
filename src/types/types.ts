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
    promo_price: number;
}

export interface IProductDetail extends IProduct {
    minQuanityOrder: number;
    characteristics: Characteristics[];
    description: string;
    availability: boolean;
    promo?: NewPrice;
    barcode?: string;
}

export interface ICartItem extends IProduct {
    quanity: number;
    minQuanityOrder: number;
    promo?: NewPrice;
    barcode?: string;
}

export interface Lang {
    id: number;
    code: string;
    title: string;
}

export interface IPhoto {
    id: number;
    img: string;
}

//translation

interface TelephoneNumber {
    presentationNum: string;
    actualNum: string;
}

interface Company {
    name: string;
    info: string;
}

interface Address {
    name: string;
    info: string[];
}

interface Email {
    name: string;
    info: string[];
}

interface Schedule {
    name: string;
    time: string;
}

interface Location {
    name: string;
    googleMap: string;
}

export interface ContactType {
    titleCompany: Company;
    address: Address;
    email: Email;
    telephone: {
        name: string;
        telephoneNumber: TelephoneNumber[];
    };
    schedule: Schedule;
    location: Location;
}

export interface IAboutPage {
    company: {
        title: string;
        sections: {
          title: string;
          text: string;
          img: string;
        }[];
      };
      benefits: {
        title: string;
        sections: {
          title: string;
          info: {
            name: string | null;
            text: string | null;
            img: string | null;
          }[];
        }[];
      };
      greeting: {
        title: string;
        text: string;
        img: string;
      };
      faq: {
        title: string;
        sections: {
          title: string;
          text: string;
          active: boolean;
        }[];
      };
      gallery: {
        title: string;
        photos: (string | null)[];
      };
}

export interface StaticTranslation {
    nav: Record<string, string>;
    proposition: Record<string, string>;
    contact_page: ContactType;
    search_page: Record<string, string>;
    sorting: Record<string, string>;
    buy_info: Record<string, string>;
    product_page: Record<string, string>;
    cart: Record<string, string>;
    order_page: {
        order: string;
        order_complete: string;
        order_complete_descr: string;
        order_pick_up: string;
        our_address: string;
        our_address_short: string;
        order_form: Record<string, string>;
    };
    about_page: IAboutPage;
}

export interface ITranslation {
    lang_id: number;
    data: StaticTranslation;
};