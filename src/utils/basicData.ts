import DeviceInfo from "react-native-device-info";
import { useAuthStore } from "store/actions/AuthStore";
import { AuthState } from "types/auth.types";

const basicData = async () => {
    const state: AuthState = useAuthStore.getState();
    const IP = await DeviceInfo.getIpAddress();
    return {
        USER_ID: state.user?.USER_ID,
        SESSION_LOGIN_ID: state.user?.SESSION_LOGIN_INFO[0].SESSION_LOGIN_ID,
        IP: IP
    }
}

export {
    basicData
}