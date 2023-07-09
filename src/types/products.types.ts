
export interface ProductState {
    store: IStore[];
    groupCategory: IGroupCategory[];
    category: ICategory[];
    product: IProduct[];
    getStore: (data?: IDataStore) => Promise<void>;
    getGroupCategory: (data?: IDataStore) => Promise<void>;
    getCategory: (data?: IDataStore) => Promise<void>;
    getProduct: (data?: IDataStore) => Promise<void>;
    filterProduct: (str?: string) => any;
}

export interface IDataStore {
    FILTER_COLOUMN?: string;
    FILTER_FIELD?: string;
    FILTER_VALUE?: string;
    PAGE_NO?: string;
    PAGE_ROW?: string;
    SORT_ORDER_BY?: string;
    SORT_ORDER_TYPE?: string;
    COMPANY_ID?: string;
}

export interface IStore {
    TOTAL_PAGE: number;
    TOTAL_RECORD: number;
    ROW_NUMBER: number;
    COMPANY_ID: string;
    COMPANY_NAME: string;
    ADDRESS: string;
    KECAMATAN_NAME: string;
    KOTA_NAME: string;
    PROVINSI_NAME: string;
    OFFICE_PHONE: string;
    OPERATIONAL_DAY: string;
    OPERATIONAL_HOUR: string;
    STORE_DESCRIPTION: string;
    THUMB_IMAGE: string;
    MAP_LOCATION: string;
    IS_HOME_VISIT: boolean;
    IS_OFF_OPERATIOANAL: boolean;
    RATING_STORE: string;
}

export interface IGroupCategory {
    TOTAL_PAGE: number;
    TOTAL_RECORD: number;
    ROW_NUMBER: number;
    ROW_ID: number;
    GROUP_ANALISA_ID: string;
    GROUP_ANALISA_NAME: string;
    THUMB_IMAGE: string;
    IS_ACTIVE: boolean;
}

export interface ICategory {
    ANALISA_ID_GLOBAL: string;
    TOTAL_PAGE: number;
    TOTAL_RECORD: number;
    ROW_NUMBER: number;
    COMPANY_ID: string;
    ANALISA_ID: string;
    KET_ANALISA: string;
    GROUP_ANALISA_ID: string;
    IS_ACTIVE: boolean;
    IS_STORE: boolean;
    THUMB_IMAGE: string;
    SORT_ORDER: number;
}

export interface IProduct {
    TOTAL_PAGE: number;
    TOTAL_RECORD: number;
    ROW_NUMBER: number;
    COMPANY_NAME: string;
    COMPANY_ID: string;
    PART_ID: string;
    PART_NAME: string;
    SPEC: string;
    ANALISA_ID: string;
    ANALISA_ID_GLOBAL: string;
    KET_ANALISA: string;
    KET_ANALISA_GLOBAL: string;
    UNIT_2: string;
    UNIT_PRICE: number;
    DISCOUNT_PCT: number;
    DISCOUNT_VAL: number;
    UNIT_PRICE_NET: number;
    MAIN_IMAGE: string;
    THUMB_IMAGE: string[];
    IS_FREE: boolean;
    IS_STOCK: boolean;
    IS_FIX_QTY: boolean;
}

export interface Banners {
    TOTAL_PAGE: number;
    TOTAL_RECORD: number;
    ROW_NUMBER: number;
    BANNER_ID: string;
    BANNER_NAME: string;
    BANNER_DESCRIPTION: string;
    BANNER_ACTION_TO: string;
    BANNER_ACTION_ID: string;
    ACTIVE_DATE: string;
    ACTIVE_UNTIL_DATE: string;
    BANNER_IMAGE: string;
    SORT_ORDER: null;

}

export interface IHistory {
    TOTAL_PAGE: number;
    TOTAL_RECORD: number;
    ROW_NUMBER: number;
    COMPANY_ID: string;
    CURRENCY_ID: string;
    SALES_ID: string;
    SALES_DATE: string;
    BOOKING_TYPE: string;
    BOOKING_DATE: string;
    BOOKING_DATE_BEFORE: string | null;
    BRUTO_VAL: number;
    DISC_PCT: number;
    DISC_VAL: number;
    PPN_PCT: number;
    PPN_VAL: number;
    DELIVERYCOST_VAL: number;
    NETTO_VAL: number;
    NOTE: string;
    STATUS_ID: string;
    STATUS_ID_DESC: string;
    STATUS_CATEGORY: string;
    STATUS_LAST_DATE: string | null;
    SETTLE_PAYMENT_METHOD: string;
    SETTLE_PAYMENT_VAL: number;
    PAYMENT_ID: string | null;
    PAYMENT_VAL: number;
    PAYMENT_BILL_VAL: number;
    ORDER_ADDRESS: string;
    ORDER_KELURAHAN_ID: string;
    ORDER_POINT: string;
    ORDER_DISTANCE: number;
    SOURCE_ID: string;
    STORE_IS_HOME_VISIT: boolean;
    STORE_MAP_LOCATION: string | null;
    STORE_OPERATIONAL_DAY: string;
    STORE_OPERATIONAL_HOUR: string;
    STORE_KECAMATAN_ID: string;
    CREATEDATE: string;
}