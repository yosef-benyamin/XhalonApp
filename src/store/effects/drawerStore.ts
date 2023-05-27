// import { IHelpers, IToastParams } from 'types/store.types';
import { create } from 'zustand';


// export const helpers = create();
const useDrawerStore = create((set) => ({
    isShowDrawer: false,
    toggleDrawer: ({
        isShowDrawer,
    }: any) => {
        set({
            isShowDrawer: isShowDrawer,
        })

    },
}))

export {
    useDrawerStore
}