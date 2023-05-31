import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useTranslation } from 'react-i18next'; 
import { useDebounce } from '../../hooks/useDebounce';
import { setOrderDone, clearCart } from '../../store/cartSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import { MEEST_SEARCH_CITY, MEEST_SEARCH_BRANCHES, NOVA_POST_BASE, NOVA_POST_KEY, API_DELIVERS, API_ORDERS } from '../../constants/api';
import { OrderData, cityObj, cityNovaPoshta, departmentMeestExpress, departmentNovaPoshta, IOrderInfo } from '../../types/types';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import './OrderForm.scss';

interface IDeliver {
    id: number;
    code: string;
    title: string;
}

const OrderForm = () => {
    const [cities, setCities] = useState<cityObj[]>();
    const [citiesNovaPoshta, setCitiesNovaPoshta] = useState<cityNovaPoshta[]>();
    const [departnentMeest, setDepartmantMeest] = useState<departmentMeestExpress[]>();
    const [departmentNovaPoshta, setDepartmantNovaPoshta] = useState<departmentNovaPoshta[]>();
    const [selectOpen, setSelectOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [postLoading, setPostLoading] = useState<boolean>(false);
    const [delivers, setDelivers] = useState<IDeliver[]>([]);
    const [postError, setPostError] = useState<string>('');
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
    const currentLang = useAppSelector(state => state.languages.curentLang);
    const dispatch = useAppDispatch();

    const getDelivers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_DELIVERS + `?lang_id=${currentLang.id}`);
            setDelivers(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    const getCity = async () => {
        try {
            if(curentDeliveryType === '3') {
                if(curentCity && curentCity.length > 0) {
                    const res = await axios.get(MEEST_SEARCH_CITY + curentCity);
                    console.log(res);
                    setCities(res.data.result);
                }
            }
            if(curentDeliveryType === '2') {
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
                    setCitiesNovaPoshta(res.data.data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getDepartmant = async () => {
        try {
            if(curentDeliveryType === '3') {
                const res = await axios.get(MEEST_SEARCH_BRANCHES + curentCity);
                setDepartmantMeest(res.data.result);
                console.log(res.data.result);
            }
            if(curentDeliveryType === '2') {
                
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
        } catch (error) {
            console.log(error);
        }
    }

    const parsingDelivery = (info: string) => {
        const regExp = /(.+?),\s(.+?),\s(.+?),\s(.+?),\s(?:відділення # (\d+)|branch # (\d+))/;
        const matches = info.match(regExp);
        let delivery_address;
        if(matches) {
            delivery_address = {
                region: matches[1].trim(),
                city: matches[2].trim(),
                street: matches[3].trim(),
                house_number: matches[4].trim(),
                postal_office: matches[5] || matches[6]
            }
            return delivery_address
        }
    } 

    const postOrder = async (order: IOrderInfo) => {
        try {
            const res = await axios.post(API_ORDERS, order);
            if(res.data.ok) {
                dispatch(setOrderDone());
                dispatch(clearCart());
                window.scrollTo(0, 0);
                reset();
            }
            console.log(res.data);
        } catch (error) {
            setPostError('Щось пішло не так, спробуйте пізніше');
            console.log(error);
        }
    }

    const onSubmit = handleSubmit((clientInfo) => {
        setPostLoading(true);
        const products = cartProducts.map(({id, quanity}) => ({id, quantity:quanity}));
        if(clientInfo.deliveryType === "1") {
            const orderInfo: IOrderInfo = {
                user_id: 1,
                email: clientInfo.email,
                lang_id: currentLang.id,
                payment_status_id: 2,
                payment_method_id: 2,
                delivery_method_id: Number(clientInfo.deliveryType),
                recipient: {
                    first_name: clientInfo.firstname,
                    middle_name: clientInfo.byFather,
                    last_name: clientInfo.surname,
                    phone: clientInfo.phone
                },
                products: products,
                comment: ""
            }
            postOrder(orderInfo);
        } else {
            let departmentInfo;
            clientInfo.department && (
                departmentInfo = parsingDelivery(clientInfo.department)
            ) 
            const orderInfo: IOrderInfo = {
                user_id: 1,
                email: clientInfo.email,
                lang_id: currentLang.id,
                payment_status_id: 2,
                payment_method_id: 2,
                delivery_method_id: Number(clientInfo.deliveryType),
                recipient: {
                    first_name: clientInfo.firstname,
                    middle_name: clientInfo.byFather,
                    last_name: clientInfo.surname,
                    phone: clientInfo.phone
                },
                products: products,
                delivery_address: departmentInfo,
                comment: ""
            }
            console.log(orderInfo);
            postOrder(orderInfo);
        }
        setPostLoading(false);
    });

    useEffect(() => {
        getDelivers();
        setValue('deliveryType', '2');
    }, [currentLang])

    useEffect(() => {
        if(debouncedCity) {
            getCity();
            getDepartmant();
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
                <label htmlFor='byFather'>{t("order_page.order_form.by_father")}</label>
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
                {loading ? <Spinner /> : (
                    <select 
                    id='deliveryType'
                    className='order-form__input-text'
                    {...register("deliveryType", { required: true })}
                    >
                        {delivers.map(deliver => (
                            <option key={deliver.id} value={deliver.id}>{deliver.title}</option>
                        ))}
                </select>
                )}
            </div>
            {curentDeliveryType === '2' && (
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
                    {
                        
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
                                                    value={`${departnent.SettlementAreaDescription} обл., ${departnent.ShortAddress}, ${t("order_page.order_form.branch_num")} ${departnent.Number}`}
                                                >
                                                    {`${departnent.SettlementAreaDescription} обл., ${departnent.ShortAddress}, ${t("order_page.order_form.branch_num")} ${departnent.Number}`}
                                                </option>
                                            )))
                                        )}
                                </select>
                            </div> 
                        
                    }
                </>
            )}
            {curentDeliveryType === '3' && (
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
                    {
                        loading ? <Spinner /> : (
                        <div className='order-form__field'>
                        <label htmlFor='department'>{t("order_page.order_form.branch")}</label>
                            <select 
                                id='department'
                                className='order-form__input-text'
                                {...register("department", { required: true })}
                                >
                                    {departnentMeest && departnentMeest.length > 0 && (
                                        departnentMeest.map((departnent => (
                                            <option 
                                                key={`${departnent.region.ua} обл., ${departnent.city.ua}, ${departnent.street.ua}, ${departnent.street_number}, ${t("order_page.order_form.branch_num")} ${departnent.num_showcase}`}
                                                value={`${departnent.region.ua} обл., ${departnent.city.ua}, ${departnent.street.ua}, ${departnent.street_number}, ${t("order_page.order_form.branch_num")} ${departnent.num_showcase}`}
                                            >
                                                {`${departnent.region.ua} обл., ${departnent.city.ua}, ${departnent.street.ua}, ${departnent.street_number}, ${t("order_page.order_form.branch_num")} ${departnent.num_showcase}`}
                                            </option>
                                        )))
                                    )}
                            </select>
                        </div>
                    )}
                </>
            )}
            {curentDeliveryType === '1' && (
                <p className='order-form__text'>{t("order_page.order_pick_up")} <br /> 
                    <a href="https://www.google.com/maps/place/50%C2%B019'19.6%22N+26%C2%B052'53.1%22E/@50.322115,26.879228,16z/data=!4m4!3m3!8m2!3d50.3221111!4d26.8814167?hl=ua" target='blank'>{t("order_page.our_address")}</a>
                </p>
            )}
            {postError.length > 0 && <p>{postError}</p>}
            <button className='order-form__order-btn' type='submit'>{t("cart.order")}</button>
            {postLoading && <Spinner />}
        </form>
    )
}

export default OrderForm;