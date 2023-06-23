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
    PART_NAME: string;
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

export interface IListOrder {
    COMPANY_ID: string;
    CURRENCY_ID: string;
    SALES_ID: string;
    SALES_DATE: string;
    BOOKING_TYPE: string;
    BOOKING_DATE: string;
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
    SETTLE_PAYMENT_METHOD: string;
    SETTLE_PAYMENT_VAL: number;
    PAYMENT_ID: string | null;
    PAYMENT_VAL: number;
    PAYMENT_BILL_VAL: number;
    ORDER_ADDRESS: string;
    ORDER_KELURAHAN_ID: string;
    ORDER_POINT: string;
    ORDER_DISTANCE: number;
    CREATEDATE: string;
    VOUCHER_CODE: string;
}

export interface CartState {
    cart: ICart;
    list_order: IListOrder;
    no_trx: string;
    saveToCart: (data: ICart) => Promise<void>;
    deleteAllCart: () => Promise<void>;
    addOrder: (data: any) => Promise<void>;
    editOrder: (data: any) => Promise<void>;
    listOrder: (data:  any) => Promise<void>;
    submitOrder: (data:  any) => Promise<void>;
    paymentOrder: (data:  any) => Promise<void>;
}
