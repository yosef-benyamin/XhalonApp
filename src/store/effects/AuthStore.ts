import { Alert } from "react-native";
import DeviceInfo from "react-native-device-info";
import { apiWithInterceptor } from "utils/interceptor";

export const register = async (data: any) => {
    try {
        const IP = await DeviceInfo.getIpAddress();
        const response: any = await apiWithInterceptor({
            method: 'post',
            url: '/SYSMAN/register',
            data: {
                "rq": {
                    "ACTION_ID": "REGISTER_MOBILE",
                    "IP": IP,
                    ...data,
                }
            },
        });
        return response.data;
    } catch (error) {
        Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
    }
}
