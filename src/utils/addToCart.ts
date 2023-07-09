import { Alert } from "react-native";
import { CameraType } from "react-native-image-picker";
import { useCartStore } from "store/actions/cartStore";
import { CartState, IItems } from "types/cart.types";
import { IProduct } from "types/products.types";
import deepClone from "./deepClone";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const checkCart = (data: IProduct) => {
    const cartStore: CartState = useCartStore.getState();

    console.log('data = ', data);
    console.log(
      'check store = ',
      cartStore?.cart?.COMPANY_ID,
      data?.COMPANY_ID,
    );
    if (
      typeof cartStore?.cart?.COMPANY_ID === 'string' &&
      cartStore?.cart?.COMPANY_ID !== data?.COMPANY_ID
    ) {
      Alert.alert('PERINGATAN', 'Apakah anda mau mengganti SALON ?', [
        {
          text: 'TIDAK',
        },
        {
          text: 'IYA',
          onPress: async () => {
            cartStore.deleteAllCart();
            handleAddCart(data);
            // setIsDelete(true);
            // setTimeout(() => {
            //   handleAddCart();
            // }, 200);
          },
        },
      ]);
    } else {
      handleAddCart(data);
    }
  };
  const handleAddCart = (data: IProduct) => {
    // console.log('data = ', data);
    const cartStore: CartState = useCartStore.getState();

    let _items: any[] = deepClone(cartStore?.cart?.ITEMS || []) || [];
    console.log('_items = ', _items);
    if (_items?.length <= 0) {
      _items.push({
        SALES_ID: '215192B0A720933892E',
        ...data,
        QTY: '1',
      });
      // Alert.alert('sukses', 'Produk berhasil ditambah ke keranjang')
      Toast.show({
        type: 'success',
        text1: 'Berhasil',
        text2: 'Berhasil menambahkan produk.'
      });
    } else {
      const id = _items.findIndex((x: any) => x?.PART_ID === data?.PART_ID);

      console.log('findid = ', id);
      if(_items[id]?.IS_FIX_QTY){
        Alert.alert('PERINGATAN', 'Quantity tidak bisa ditambah lagi!')
        return;
      }
      if (id !== -1) {
        console.log('masuk fi');
        let _ = JSON.parse(_items[id].QTY);
        _items[id].QTY = JSON.stringify(_ + 1);
        // Alert.alert('sukses', 'Produk berhasil ditambah ke keranjang')
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: 'Berhasil menambahkan produk.',
        });
      } else {
        console.log('masuk else');
        // Alert.alert('sukses', 'Produk berhasil ditambah ke keranjang')
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: 'Berhasil menambahkan produk.'
        });
        _items.push({
          SALES_ID: '215192B0A720933892E',
          QTY: '1',
          ...data
        });
      }
    }

    console.log('_items = ', _items);

    cartStore.saveToCart({
      ITEMS: _items,
      COMPANY_ID: data?.COMPANY_ID,
    });
  };

  export {
    checkCart,
    handleAddCart
  }