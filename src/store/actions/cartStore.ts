// import { IHelpers, IToastParams } from 'types/store.types';
import { AuthState } from 'types/auth.types';
import { apiWithInterceptor } from 'utils/interceptor';
import { SetState, create } from 'zustand';
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICart } from 'types/cart.types';
import { basicData } from 'utils/basicData';
import { deepClone } from 'utils';

const useCartStore = create<any>(
    persist(
        (set: SetState<any>) => ({
            cart: {},
            no_trx: '',
            list_order: {},
            saveToCart: async (data: ICart) => {
                console.log('data cart = ', data);
                try {

                    set(() => ({
                        cart: data,
                    }));

                } catch (error) {

                }
            },
            deleteAllCart: () => {
                set(() => ({
                    cart: {
                        ITEMS: []
                    },
                }));
            },
            addOrder: async (data: any) => {
                try {

                    const basic = await basicData();

                    const response: any = await apiWithInterceptor({
                        method: 'post',
                        url: '/SALES/order',
                        data: {
                            "rq": {
                                ACTION_ID: "ADD_HM",
                                ...basic,
                                ...data
                            }
                        },
                    });
                    console.log('response product = ', response.data)

                    if (response.data?.rs?.[0]?.RESULT_CODE !== '01') {
                        Alert.alert('PERINGATAN', 'Terjadi kesalahan, silahkan hubungi CS');
                        return
                    }

                    let items = deepClone(data?.ITEMS);
                    let _: any = []
                    items?.map((x: any) => {
                        _.push(
                            {
                                PART_ID: x?.PART_ID,
                                QTY: x?.QTY,
                                SALES_ID: response.data?.rs?.[0]?.NO_TRX
                            }
                        );
                    })
                    const dataDetail = {
                        "COMPANY_ID": data?.COMPANY_ID,
                        DATA: [..._]
                    }
                    console.log('datadetail = ', dataDetail);

                    const responseDetail: any = await apiWithInterceptor({
                        method: 'post',
                        url: '/SALES/order_detail',
                        data: {
                            "rq": {
                                ACTION_ID: "ADD_DM",
                                ...basic,
                                ...dataDetail
                            }
                        },
                    });

                    console.log('response detaiul; = ', responseDetail?.data)

                    if (responseDetail.status === 200 && responseDetail.data?.rs?.DATA?.length > 0) {
                        set(() => ({
                            no_trx: response.data?.rs?.[0]?.NO_TRX
                        }));
                        return responseDetail.status;
                    } else {
                        Alert.alert('PERINGATAN', 'Terjadi kesalahan, silahkan hubungi CS');
                        return
                    }
                } catch (error) {
                    console.log('error:', error);
                }
            },
            editOrder: async (data: any) => {
                try {

                    const basic = await basicData();

                    const response: any = await apiWithInterceptor({
                        method: 'post',
                        url: '/SALES/order',
                        data: {
                            "rq": {
                                ACTION_ID: "EDIT_HM",
                                ...basic,
                                ...data
                            }
                        },
                    });
                    console.log('response edit = ', response.data)

                    if (response.status === 200 && response.data?.rs?.[0]?.RESULT_CODE === '01') {
                        return response.status;
                    } else {
                        Alert.alert('PERINGATAN', 'Terjadi kesalahan, silahkan hubungi CS');
                        return
                    }
                } catch (error) {
                    console.log('error:', error);
                }
            },
            submitOrder: async (data: any) => {
                try {

                    const basic = await basicData();

                    const response: any = await apiWithInterceptor({
                        method: 'post',
                        url: '/SALES/order',
                        data: {
                            "rq": {
                                ACTION_ID: "SUBMIT_CART",
                                ...basic,
                                ...data
                            }
                        },
                    });
                    console.log('response submit = ', response.data)

                    if (response.status === 200 && response.data?.rs?.[0]?.RESULT_CODE === '01') {
                        return response.status;
                    } else {
                        Alert.alert('PERINGATAN', 'Terjadi kesalahan, silahkan hubungi CS');
                        return
                    }
                } catch (error) {
                    console.log('error:', error);
                }
            },
            paymentOrder: async (data: any) => {
                try {

                    const basic = await basicData();

                    const response: any = await apiWithInterceptor({
                        method: 'post',
                        url: '/SALES/order',
                        data: {
                            "rq": {
                                ACTION_ID: "CHECKOUT_M",
                                ...basic,
                                ...data
                            }
                        },
                    });
                    console.log('response submit = ', response.data)

                    if (response.status === 200 && response.data?.redirect_url) {
                        return response.data;
                    } else {
                        Alert.alert('PERINGATAN', 'Terjadi kesalahan, silahkan hubungi CS');
                        return
                    }
                } catch (error) {
                    console.log('error:', error);
                }
            },
            listOrder: async (data: any) => {
                try {

                    const basic = await basicData();
                    console.log('basicx = ', basic)

                    const response: any = await apiWithInterceptor({
                        method: 'post',
                        url: '/SALES/order',
                        data: {
                            "rq": {
                                ACTION_ID: "LIST_HM",
                                ...basic,
                                ...data
                            }
                        },
                    });
                    console.log('response product = ', response.data)


                    console.log('response list; = ', response.data.rs?.DATA?.[0])
                    if (response.status === 200 && response.data?.rs?.RESULT_CODE === '01') {
                        set(() => ({
                            list_order: response.data.rs?.DATA?.[0]
                        }));
                    } else {
                        Alert.alert('PERINGATAN', 'Terjadi kesalahan, silahkan hubungi CS');
                        return
                    }
                } catch (error) {
                    console.log('error:', error);
                }
            },
        }), {
        name: 'cart',
        storage: createJSONStorage(() => AsyncStorage),
    }));


export {
    useCartStore
}