export interface ICart {
    COMPANY_ID: string;
    // COMPANY_NAME: string;
    // ADDRESS: string;
    // KECAMATAN_NAME: string;
    // KOTA_NAME: string;
    // PROVINSI_NAME: string;
    // OFFICE_PHONE: string;
    // OPERATIONAL_DAY: string;
    // OPERATIONAL_HOUR: string;
    // STORE_DESCRIPTION: string;
    // MAIN_IMAGE: string;
    // QTY_MAX: number;
    // QTY_MIN: number;
    // UNIT_PRICE: number;
    // DISCOUNT_PCT: number;
    // DISCOUNT_VAL: number;
    // UNIT_PRICE_NET: number;
    // KET_ANALISA_GLOBAL: string;
    // MAP_LOCATION: string;
    // IS_HOME_VISIT: boolean;
    // IS_OFF_OPERATIOANAL: boolean;
    // RATING_STORE: string;
    ITEMS?: IItems[]
}

export interface IItems {
    SALES_ID: string;
    PART_ID: string;
    QTY: string;
    MAIN_IMAGE: string;
    QTY_MAX: number;
    QTY_MIN: number;
    UNIT_PRICE: number;
    DISCOUNT_PCT: number;
    DISCOUNT_VAL: number;
    UNIT_PRICE_NET: number;
    KET_ANALISA_GLOBAL: string;
    IS_SELECTED: boolean;
}

export interface CartState {
    cart: ICart;
    saveToCart: (data: ICart) => Promise<void>;
    deleteAllCart: () => Promise<void>;
}
