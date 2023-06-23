
export interface FavoriteState {
    listFavorite: IFavorite[];
    getFavorite: (data?: any) => Promise<void>;
}

export interface IFavorite {
    NO_TRX: string;
    RESULT_CODE: string;
    RESULT_DESC: string;
    PART_ID: string;
    RESULT_MESSAGE: string;
}
