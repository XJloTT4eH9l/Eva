import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next'; 
import { useDebounce } from '../../hooks/useDebounce';
import { setOrderDone, clearCart } from '../../store/cartSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import { MEEST_SEARCH_CITY, MEEST_SEARCH_BRANCHES, NOVA_POST_BASE, NOVA_POST_KEY } from '../../constants/api';
import { ICartItem } from '../../types/types';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import './OrderForm.scss';

type OrderData = {
    firstname: string;
    surname: string;
    byFather: string;
    email: string;
    phone: string;
    deliveryType: string;
    order: ICartItem[];
    city?: string;
    department?: departmentMeestExpress | departmentNovaPoshta;
}

type cityObj = {
    data: cityType;
}

type cityType = {
    n_ua: string;
    city_id: string;
    reg: string;
}

type cityNovaPoshta = {
    Description: string;
    CityId: string;
    AreaDescription: string;
}

type srteetTypeMeestExpress = {
    ua: string;
    ru: string;
    en: string;
}

type departmentMeestExpress = {
    city: srteetTypeMeestExpress;
    street: srteetTypeMeestExpress;
    street_number: string;
    num_showcase: string;
}

type departmentNovaPoshta = {
    SiteKey: string;
    ShortAddress: string;
    Number: string;
}

const OrderForm = () => {
    const [cities, setCities] = useState<cityObj[]>();
    const [citiesNovaPoshta, setCitiesNovaPoshta] = useState<cityNovaPoshta[]>();
    const [departnentMeest, setDepartmantMeest] = useState<departmentMeestExpress[]>();
    const [departmentNovaPoshta, setDepartmantNovaPoshta] = useState<departmentNovaPoshta[]>();
    const [selectOpen, setSelectOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation();

    const {
        register,
        setValue,
        watch,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm<OrderData>({
        mode: 'onSubmit'
    });
    
    const curentDeliveryType = watch('deliveryType');
    const curentCity = watch('city');
    const debouncedCity = useDebounce(curentCity, 500);
    const cartProducts = useAppSelector(state => state.cartItems.cartItems);
    const dispatch = useAppDispatch();


    const getCity = async () => {
        try {
            setLoading(true);
            if(curentDeliveryType === 'Meest Express') {
                if(curentCity && curentCity.length > 0) {
                    const res = await axios.get(MEEST_SEARCH_CITY + curentCity);
                    console.log(res);
                    setCities(res.data.result);
                }
            }
            if(curentDeliveryType === 'Нова пошта') {
                if(curentCity && curentCity.length > 0) {
                    const res = await axios.post(NOVA_POST_BASE, {
                        apiKey: NOVA_POST_KEY,
                        modelName: 'Address',
                        calledMethod: 'getCities',
                        methodProperties: {
                            FindByString : curentCity,
                            Language: 'ua'
                        }
                    });
                    console.log(res);
                    setCitiesNovaPoshta(res.data.data)
                }
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getDepartmant = async () => {
        try {
            setLoading(true);
            if(curentDeliveryType === 'Meest Express') {
                const res = await axios.get(MEEST_SEARCH_BRANCHES + curentCity);
                setDepartmantMeest(res.data.result);
            }
            if(curentDeliveryType === 'Нова пошта') {
                
                const res = await axios.post(NOVA_POST_BASE, {
                    apiKey: NOVA_POST_KEY,
                    modelName: 'Address',
                    calledMethod: 'getWarehouses',
                    methodProperties: {
                        CityName: curentCity,
                        TypeOfWarehouseRef: '841339c7-591a-42e2-8233-7a0a00f0ed6f'
                    }
                });

                setDepartmantNovaPoshta(res.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = handleSubmit((clientInfo) => {
        const order = {
            clientInfo,
            cartProducts
        };
        console.log(order);
        dispatch(setOrderDone());
        dispatch(clearCart());
        window.scrollTo(0, 0);
        reset();
    });

    useEffect(() => {
        setValue('deliveryType', 'Нова пошта');
    }, [])

    useEffect(() => {
        if(debouncedCity) {
            getCity();
            getDepartmant();
            console.log(debouncedCity);
        }
    }, [debouncedCity])

    useEffect(() => {
        setValue('city', '');
    }, [curentDeliveryType])

    return (
        <form className="order-form" onSubmit={onSubmit}>
            <h2 className='order-form__title'>{t("order_page.order_form.title")}</h2>
            <div className='order-form__field'>
                <label htmlFor='firstname'>{t("order_page.order_form.name")}</label>
                <input 
                    type="text" 
                    id='firstname'
                    className='order-form__input-text' 
                    {...register('firstname', {
                        required: t("order_page.order_form.required_field") || 'required',
                        minLength: {
                            value: 3,
                            message: t("order_page.order_form.min_symbols") || ''
                        },
                        maxLength: {
                            value: 15,
                            message: t("order_page.order_form.max_symbols") || ''
                        }
                    })}
                />
                <div className='order-form__error'>
                    {errors.firstname && <p>{errors.firstname.message || 'Error'}</p>}
                </div>
            </div>
            <div className='order-form__field'>
                <label htmlFor='surname'>{t("order_page.order_form.surname")}</label>
                <input 
                    type="text" 
                    id='surname'
                    className='order-form__input-text' 
                    {...register('surname', {
                        required: t("order_page.order_form.required_field") || 'required',
                        minLength: {
                            value: 3,
                            message: t("order_page.order_form.min_symbols") || ''
                        },
                        maxLength: {
                            value: 15,
                            message: t("order_page.order_form.max_symbols") || ''
                        }
                    })}
                />
                <div className='order-form__error'>
                    {errors.surname && <p>{errors.surname.message || 'Error'}</p>}
                </div>
            </div>
            <div className='order-form__field'>
                <label htmlFor='byFather'>{t("order_page.order_form.surname")}</label>
                <input 
                    type="text" 
                    id='byFather'
                    className='order-form__input-text' 
                    {...register('byFather', {
                        required: t("order_page.order_form.required_field") || 'required',
                        minLength: {
                            value: 3,
                            message: t("order_page.order_form.min_symbols") || ''
                        },
                        maxLength: {
                            value: 15,
                            message: t("order_page.order_form.max_symbols") || ''
                        }
                    })}
                />
                <div className='order-form__error'>
                    {errors.byFather && <p>{errors.byFather.message || 'Error'}</p>}
                </div>
            </div>
            <div className='order-form__field'>
                <label htmlFor='email'>{t("order_page.order_form.email")}</label>
                <input 
                    type="text" 
                    id='email'
                    className='order-form__input-text' 
                    {...register('email', {
                        required: t("order_page.order_form.required_field") || 'required',
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: t("order_page.order_form.wrong_email") || 'Incorect email'
                        }
                    })}
                />
                <div className='order-form__error'>
                    {errors.email && <p>{errors.email.message || 'Error'}</p>}
                </div>
            </div>
            <div className='order-form__field'>
                <label htmlFor='phone'>{t("order_page.order_form.phone")}</label>
                <input 
                    type="tel" 
                    id='phone'
                    className='order-form__input-text' 
                    {...register('phone', {
                        required: t("order_page.order_form.required_field") || 'required',
                        pattern: {
                            value: /^[+]{0,1}380([0-9]{9})$/,
                            message: t("order_page.order_form.wrong_phone") || '+380*********'
                        }
                    })}
                />
                <div className='order-form__error'>
                    {errors.phone && <p>{errors.phone.message || 'Error'}</p>}
                </div>
            </div>
            <div className='order-form__field'>
            <label htmlFor='deliveryType'>{t("order_page.order_form.delivery")}</label>
                <select 
                    id='deliveryType'
                    className='order-form__input-text'
                    {...register("deliveryType", { required: true })}
                    >
                        <option value="Нова пошта">{t("order_page.order_form.nova_poshta")}</option>
                        <option value="Meest Express">{t("order_page.order_form.meest_express")}</option>
                        <option value="Самовивіз">{t("order_page.order_form.self_deliver")}</option>
                </select>
            </div>
            {curentDeliveryType === 'Нова пошта' && (
                <>
                    <div className='order-form__field'>
                    <label htmlFor='city'>{t("order_page.order_form.city")}</label>
                    <input 
                        type="text" 
                        id='city'
                        className='order-form__input-text' 
                        onClick={() => {
                            setSelectOpen(!selectOpen);
                        }}
                        {...register('city', {
                            required: t("order_page.order_form.required_field") || 'required',
                            minLength: {
                                value: 3,
                                message: t("order_page.order_form.min_symbols") || ''
                            }
                        })}
                    />
                    <div className='order-form__error'>
                        {errors.city && <p>{errors.city.message || 'Error'}</p>}
                    </div>
                    <div className={selectOpen ? 'order-form__select-fields order-form__select-fields--active' : 'order-form__select-fields'}>
                        {citiesNovaPoshta && (
                            loading ? <Spinner /> : (
                                <ul className='order-form__list'>
                                {citiesNovaPoshta.length > 0 && citiesNovaPoshta.filter((city, i) => i <= 8).map(city => (
                                    <li 
                                        key={city.CityId + city.Description} 
                                        onClick={() => {
                                            setValue('city', city.Description);
                                            setSelectOpen(false);
                                        }}
                                    >
                                        {city.Description} ({city.AreaDescription} {t("order_page.order_form.region")})
                                    </li>
                                ))}
                            </ul>
                            )
                        )}
                    </div>
                    </div>
                    {curentCity && curentCity.length > 1 && (
                        loading ? <Spinner /> : (
                            <div className='order-form__field'>
                            <label htmlFor='department'>{t("order_page.order_form.branch")}</label>
                                <select 
                                    id='department'
                                    className='order-form__input-text'
                                    {...register("department", { required: true })}
                                    >
                                        {departmentNovaPoshta && departmentNovaPoshta.length > 0 && (
                                            departmentNovaPoshta.map((departnent => (
                                                <option 
                                                    key={departnent.SiteKey}
                                                    value={`${departnent.ShortAddress}, ${t("order_page.order_form.branch_num")} ${departnent.Number}`}
                                                >
                                                    {`${departnent.ShortAddress}, ${t("order_page.order_form.branch_num")} ${departnent.Number}`}
                                                </option>
                                            )))
                                        )}
                                </select>
                            </div> 
                        )
                    )}
                </>
            )}
            {curentDeliveryType === 'Meest Express' && (
                <>
                    <div className='order-form__field'>
                        <label htmlFor='city'>{t("order_page.order_form.city")}</label>
                        <input 
                            type='text'
                            id='city'
                            placeholder='Знайти місто'
                            className='order-form__input-text order-form__input-text--custom'
                            onClick={() => {
                                setSelectOpen(!selectOpen);
                            }}
                            {...register('city' , {
                                required: t("order_page.order_form.required_field") || '',
                            })}
                        />
                        <div className='order-form__error'>
                            {errors.city && <p>{errors.city.message || 'Error'}</p>}
                        </div>
                            <div className={selectOpen ? 'order-form__select-fields order-form__select-fields--active' : 'order-form__select-fields'}>
                                {cities && (
                                    loading ? <Spinner /> : (
                                        <ul className='order-form__list'>
                                            {cities.length > 0 && cities.filter((city, i) => i <= 8).map(city => (
                                                <li 
                                                    key={city.data.city_id} 
                                                    onClick={() => {
                                                        setValue('city', city.data.n_ua);
                                                        setSelectOpen(false);
                                                    }}
                                                >
                                                    {city.data.n_ua} ({(city.data.reg).toLowerCase()} {t("order_page.order_form.region")})
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                )}
                            </div>
                    </div>
                    {curentCity && curentCity.length > 1 && (
                        <div className='order-form__field'>
                        <label htmlFor='department'>{t("order_page.order_form.branch")}</label>
                            <select 
                                id='department'
                                className='order-form__input-text'
                                {...register("department", { required: true })}
                                >
                                    {departnentMeest && departnentMeest.length > 0 && (
                                        departnentMeest.map(( departnent => (
                                            <option 
                                                key={`${departnent.city.ua}, ${departnent.street.ua} ${departnent.street_number}, ${t("order_page.order_form.branch_num")} ${departnent.num_showcase}`}
                                                value={`${departnent.city.ua}, ${departnent.street.ua} ${departnent.street_number}, ${t("order_page.order_form.branch_num")} ${departnent.num_showcase}`}
                                            >
                                                {`${departnent.city.ua}, ${departnent.street.ua} ${departnent.street_number}, ${t("order_page.order_form.branch_num")} ${departnent.num_showcase}`}
                                            </option>
                                        )))
                                    )}
                            </select>
                        </div>
                    )}
                </>
            )}
            {curentDeliveryType === 'Самовивіз' && (
                <p className='order-form__text'>{t("order_page.order_pick_up")} <br /> 
                    <a href="https://www.google.com/maps/place/50%C2%B019'19.6%22N+26%C2%B052'53.1%22E/@50.322115,26.879228,16z/data=!4m4!3m3!8m2!3d50.3221111!4d26.8814167?hl=ua" target='blank'>{t("order_page.our_address")}</a>
                </p>
            )}
            <button className='order-form__order-btn' type='submit'>{t("cart.order")}</button>
        </form>
    )
}

export default OrderForm;