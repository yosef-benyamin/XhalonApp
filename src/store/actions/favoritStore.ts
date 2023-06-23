import { apiWithInterceptor } from 'utils/interceptor';
import { SetState, create } from 'zustand';
import { basicData } from 'utils/basicData';
import { FavoriteState } from 'types/favorite.types';

const initData = {
    "FILTER_COLOUMN": "",
    "FILTER_FIELD": "",
    "FILTER_VALUE": "",
    "PAGE_NO": "1",
    "PAGE_ROW": "10000",
    "SORT_ORDER_TYPE": "ASC",
    "SORT_ORDER_BY": "PART_ID"
}
const useFavoriteStore = create<FavoriteState>((set: SetState<FavoriteState>) => ({
    listFavorite: [],
    getFavorite: async (data = initData) => {
        try {
            // const state: AuthState = useAuthStore.getState()
            const basic = await basicData()
            console.log('basic = ', basic);
            const response: any = await apiWithInterceptor({
                method: 'post',
                url: '/SALES/m_produk_favorit',
                data: {
                    "rq": {
                        ACTION_ID: "LIST_H",
                        ...basic,
                        ...data
                    }
                },
            });
            console.log('response.data.rs?.fav = ', response.data)
            if (response.status === 200 && response.data?.rs?.RESULT_CODE === '01') {
                set(() => ({
                    listFavorite: response.data.rs?.DATA || []
                }));
            } else {
                // set(() => ({
                //     store: []
                // }));
            }
        } catch (error) {
            console.log('error:', error);
        }
    }

}));

export {
    useFavoriteStore
}