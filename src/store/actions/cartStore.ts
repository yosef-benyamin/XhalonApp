// import { IHelpers, IToastParams } from 'types/store.types';
import { AuthState } from 'types/auth.types';
import { apiWithInterceptor } from 'utils/interceptor';
import { SetState, create } from 'zustand';
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICart } from 'types/cart.types';

const useCartStore = create<any>(
    persist(
        (set: SetState<any>) => ({
            cart: {
                ITEMS: []
            },
            saveToCart: async (data: ICart) => {
                console.log('data cart = ', data);
                try {
                    
                    set(() => ({
                        cart: data,
                    }));

                } catch (error) {

                }
            },
            deleteAllCart:()=> {
                set(() => ({
                    cart: {
                        ITEMS: []
                    },
                }));
            }
        }), {
        name: 'cart',
        storage: createJSONStorage(() => AsyncStorage),
    }));


export {
    useCartStore
}