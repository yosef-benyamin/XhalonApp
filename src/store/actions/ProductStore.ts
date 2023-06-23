import { apiWithInterceptor } from 'utils/interceptor';
import { SetState, create } from 'zustand';
import { useAuthStore } from '../actions/AuthStore'
import { AuthState } from 'types/auth.types';
import { ProductState } from 'types/products.types';
import { basicData } from 'utils/basicData';

const initData = {
    "FILTER_COLOUMN": "",
    "FILTER_FIELD": "",
    "FILTER_VALUE": "",
    "PAGE_NO": "1",
    "PAGE_ROW": "20",
    "SORT_ORDER_BY": "ANALISA_ID",
    "SORT_ORDER_TYPE": "DESC",
    "COMPANY_ID": "ALL"
}

const initDataStore = {
    "FILTER_COLOUMN": "",
    "FILTER_FIELD": "",
    "FILTER_VALUE": "",
    "PAGE_NO": "1",
    "PAGE_ROW": "1000",
    "SORT_ORDER_BY": "COMPANY_ID",
    "SORT_ORDER_TYPE": "DESC",
    "COMPANY_ID": "ALL"
}
const useProductStore = create<ProductState>((set: SetState<ProductState>) => ({
    store: [],
    groupCategory: [],
    category: [],
    product: [],
    getStore: async (data = initDataStore) => {
        try {

            // const state: AuthState = useAuthStore.getState()
            const basic = await basicData()

            const response: any = await apiWithInterceptor({
                method: 'post',
                url: '/SALES/m_store',
                data: {
                    "rq": {
                        ACTION_ID: "LIST_H",
                        ...basic,
                        ...data
                    }
                },
            });
            console.log('response.data.rs?.store = ', response.data)
            if (response.status === 200 && response.data?.rs?.RESULT_CODE === '01') {
                set(() => ({
                    store: response.data.rs?.DATA
                }));
            } else {
                // set(() => ({
                //     store: []
                // }));
            }
        } catch (error) {
            console.log('error:', error);
        }
    },
    getGroupCategory: async (data = initData) => {
        try {

            const state: AuthState = useAuthStore.getState()

            const response: any = await apiWithInterceptor({
                method: 'post',
                url: '/SALES/m_kategori_group',
                data: {
                    "rq": {
                        ACTION_ID: "LIST_H",
                        USER_ID: state.user?.USER_ID,
                        SESSION_LOGIN_ID: state.user?.SESSION_LOGIN_INFO[0].SESSION_LOGIN_ID,
                        ...data,
                        SORT_ORDER_BY: "GROUP_ANALISA_ID",
                    }
                },
            });

            // console.log('response.data.rs?.DATA = ', response.data.rs)
            if (response.status === 200 && response.data?.rs?.RESULT_CODE === '01') {
                set(() => ({
                    groupCategory: response.data.rs?.DATA
                }));
            } else {
                // set(() => ({
                //     store: []
                // }));
            }
        } catch (error) {
            console.log('error:', error);
        }
    },
    getCategory: async (data = initData) => {
        try {

            const state: AuthState = useAuthStore.getState()
            const basic = await basicData()
            console.log('basic = ', basic)

            const response: any = await apiWithInterceptor({
                method: 'post',
                url: '/SALES/m_kategori',
                data: {
                    "rq": {
                        ACTION_ID: "LIST_H",
                        ...data,
                        ...basic,
                    }
                },
            });
            console.log('getCategory = ', response.data)
            if (response.status === 200 && response.data?.rs?.RESULT_CODE === '01') {
                set(() => ({
                    category: response.data.rs?.DATA
                }));
            } else {
                // set(() => ({
                //     store: []
                // }));
            }
        } catch (error) {
            console.log('error:', error);
        }
    },
    getProduct: async (data = initData) => {
        try {

            const basic = await basicData();

            const response: any = await apiWithInterceptor({
                method: 'post',
                url: '/SALES/m_produk',
                data: {
                    "rq": {
                        ACTION_ID: "LIST_H",
                        ...basic,
                        ...data
                    }
                },
            });
            // console.log('response product = ', response.data.rs)
            if (response.status === 200 && response.data?.rs?.RESULT_CODE === '01') {
                set(() => ({
                    product: response.data.rs?.DATA
                }));
            } else {
                // set(() => ({
                //     store: []
                // }));
            }
        } catch (error) {
            console.log('error:', error);
        }
    },
    filterProduct: (str: string = '') => {
        console.log('str = ', str);
        const _product: any = useProductStore.getState().product;
        console.log('filtering =- ', sortArrayOfObjectsByProperty(_product, 'ANALISA_ID_GLOBAL', str))
        set(() => ({
            product: sortArrayOfObjectsByProperty(_product, 'ANALISA_ID_GLOBAL', str),
        }));
        return 'a';
    }
}));

export {
    useProductStore
}
function sortArrayOfObjectsByProperty(arr, property, priorityValue) {
    const sortedArray = arr.sort((a, b) => {
        if (a[property] === priorityValue) return -1;
        if (b[property] === priorityValue) return 1;
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    });

    return sortedArray;
}