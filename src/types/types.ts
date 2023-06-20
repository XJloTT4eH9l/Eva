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
    promo_price: number | null;
}

export interface IProductDetail extends IProduct {
    minQuanityOrder: number;
    characteristics: Characteristics[];
    description: string;
    availability: boolean;
    promo?: NewPrice;
    barcode?: string;
}
interface IPromo {
    promo_price: number | null;
} 
export interface IProductSize {
    id: number;
    package_id: number;
    package_quantity: number;
    price: number;
    promo: IPromo;
}

export interface ICartItem extends IProduct {
    quanity: number;
    minQuanityOrder: number;
    promo?: NewPrice;
    barcode?: string;
    size: number;
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

export type OrderData = {
    firstname: string;
    surname: string;
    byFather: string;
    email: string;
    phone: string;
    deliveryType: string;
    order: ICartItem[];
    city?: string;
    department?: string;
}

export type cityObj = {
    data: cityType;
}

export type cityType = {
    n_ua: string;
    city_id: string;
    reg: string;
}

export type cityNovaPoshta = {
    Description: string;
    CityId: string;
    AreaDescription: string;
}

export type srteetTypeMeestExpress = {
    ua: string;
    ru: string;
    en: string;
}
type MeestRegion = {
    ua: string,
    en: string
}

export type departmentMeestExpress = {
    city: srteetTypeMeestExpress;
    street: srteetTypeMeestExpress;
    street_number: string;
    num_showcase: string;
    region: MeestRegion;
}

export type departmentNovaPoshta = {
    SiteKey: string;
    ShortAddress: string;
    Number: string;
    SettlementAreaDescription: string;
}
// Order info //
interface Recipient {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone: string;
  }
  
  interface Product {
    id: number;
    quantity: number;
  }
  
  interface DeliveryAddress {
    region: string;
    city: string;
    street: string;
    house_number: string;
    postal_office: string;
  }

export interface IOrderInfo {
    user_id: number;
    email: string;
    lang_id: number;
    payment_status_id: number;
    payment_method_id: number;
    delivery_method_id: number;
    recipient: Recipient;
    products: Product[];
    delivery_address?: DeliveryAddress;
    comment: string;
}