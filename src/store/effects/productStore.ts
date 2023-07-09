import { Alert } from "react-native";
import DeviceInfo from "react-native-device-info";
import { basicData } from "utils/basicData";
import { apiWithInterceptor } from "utils/interceptor";

export const kategoriFavorit = async () => {
    try {
        // const IP = await DeviceInfo.getIpAddress();
        const basic = await basicData();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SALES/m_produk_analisis',
            data: {
                "rq": {
                    "ACTION_ID": "L_PRODUCT_FAVORIT",
                    ...basic,
                    "COMPANY_ID": "ALL",
                    "FILTER_FIELD": "",
                    "FILTER_VALUE": "",
                    "PAGE_NO": "1",
                    "PAGE_ROW": "20",
                    "SORT_ORDER_BY": "KET_ANALISA_GLOBAL",
                    "SORT_ORDER_TYPE": "ASC"
                }
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}


export const listHistory = async (status: string = 'NEW_APP') => {
    try {
        // const IP = await DeviceInfo.getIpAddress();
        const basic = await basicData();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SALES/order',
            data: {
                "rq": {
                    "ACTION_ID": "LIST_HM",
                    ...basic,
                    "FILTER_DAY": "",
                    "FILTER_MONTH": "",
                    "FILTER_YEAR": "",
                    "FILTER_FIELD": "",
                    "FILTER_VALUE": "",
                    "PAGE_NO": "1",
                    "PAGE_ROW": "20",
                    "SORT_ORDER_BY": "SALES_DATE",
                    "SORT_ORDER_TYPE": "DESC",
                    "TRANSACTION_ID": "",
                    "STATUS_ID": "",
                    "STATUS_CATEGORY": status
                }
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}



export const listDetailTransaction = async (SALES_ID: string = '') => {
    try {
        // const IP = await DeviceInfo.getIpAddress();
        const basic = await basicData();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SALES/order_detail',
            data: {
                "rq": {
                    "ACTION_ID": "LIST_D",
                    ...basic,
                    "SALES_ID": SALES_ID
                }
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}

export const getOrderStatus = async (SALES_ID: string = '') => {
    try {
        // const IP = await DeviceInfo.getIpAddress();
        console.log('sales = ', SALES_ID)
        const basic = await basicData();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SALES/order',
            data: {
                "rq": {
                    "ACTION_ID": "LIST_HM_HISTORY",
                    ...basic,
                    "SALES_ID": SALES_ID
                }
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}



export const storePromo = async () => {
    try {
        // const IP = await DeviceInfo.getIpAddress();
        const basic = await basicData();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SALES/m_store',
            data: {
                "rq": {
                    "ACTION_ID": "L_PROMOTION_STORE",
                    ...basic,
                    "COMPANY_ID": "ALL",
                    "SORT_ORDER_BY": "COMPANY_ID",
                    "SORT_ORDER_TYPE": "AC"
                }
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}


export const getBanners = async () => {
    try {
        // const IP = await DeviceInfo.getIpAddress();
        const basic = await basicData();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SALES/m_banner',
            data: {
                "rq": {
                    "ACTION_ID": "LIST_H",
                    ...basic,
                    "PAGE_NO": 1,
                    "PAGE_ROW": 20,
                    "SORT_ORDER_BY": "ACTIVE_DATE",
                    "SORT_ORDER_TYPE": "DESC"
                }
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}
