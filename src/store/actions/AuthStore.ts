// import { IHelpers, IToastParams } from 'types/store.types';
import { AuthState } from 'types/auth.types';
import { apiWithInterceptor } from 'utils/interceptor';
import { SetState, create } from 'zustand';
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create<any>(
    persist(
        (set: SetState<any>) => ({
            isAuthenticated: false,
            user: null,
            login: async (username: string, password: string) => {
                try {
                    const IP = await DeviceInfo.getIpAddress();
                    console.log('ip add = ', IP);
                    const response: any = await apiWithInterceptor({
                        method: 'post',
                        url: '/SYSMAN/login',
                        data: {
                            "rqlogin": {
                                "USER_ID": username,
                                "PASSWORD": password,
                                "IP": IP
                            }
                        },
                    });
                    console.log('res login = ', response.data?.rsLogin)
                    if (response.status === 200 && response?.data?.rsLogin?.RESULT_CODE === '01') {
                        set(() => ({
                            isAuthenticated: true,
                            user: {
                                USER_ID: response.data?.rsLogin?.USER_ID,
                                SESSION_LOGIN_INFO: response.data?.rsLogin?.SESSION_LOGIN_INFO
                            },
                        }));
                    } else {
                        Alert.alert('Peringatan', response.data?.rsLogin?.MESSAGE || 'User atau Password tidak di temukan');
                    }
                } catch (error) {
                    Alert.alert('Peringatan', 'Terjadi kesalahan, silahkan hubungi admin.');
                }
            },
            logout: async (USER_ID: string, SESSION_LOGIN_ID: string) => {

                try {
                    const response: any = await apiWithInterceptor({
                        method: 'post',
                        url: '/SYSMAN/login',
                        data: {
                            "rqLogout": {
                                "USER_ID": USER_ID,
                                "SESSION_LOGIN_ID": SESSION_LOGIN_ID,
                            }
                        },
                    });

                    set(() => ({
                        isAuthenticated: false,
                        user: null,
                    }));

                } catch (error) {

                }

            }
        }), {
        name: 'auth',
        storage: createJSONStorage(() => AsyncStorage),
    }));


export {
    useAuthStore
}