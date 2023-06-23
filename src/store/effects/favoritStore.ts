import { Alert } from "react-native";
import DeviceInfo from "react-native-device-info";
import { basicData } from "utils/basicData";
import { apiWithInterceptor } from "utils/interceptor";

export const addFavorit = async (data: {PART_ID: string}[]) => {
    try {
        // const IP = await DeviceInfo.getIpAddress();
        const basic = await basicData();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SALES/m_produk_favorit',
            data: {
                "rq": {
                    "ACTION_ID": "ADD_H",
                    ...basic,
                    DATA: data
                }
            },
        });
        console.log('res add = ', response?.data);
        return true;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}


export const deleteFavorit = async (data: {PART_ID: string}[]) => {
    try {
        // const IP = await DeviceInfo.getIpAddress();
        const basic = await basicData();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SALES/m_produk_favorit',
            data: {
                "rq": {
                    "ACTION_ID": "DELETE_H",
                    ...basic,
                    DATA: data
                }
            },
        });
        console.log('res add = ', response?.data);
        if(response?.data?.res?.DATA?.length > 0) {
            Alert.alert("Sukses", 'Sukses menghapus data');
            return true;
        }
        
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}
