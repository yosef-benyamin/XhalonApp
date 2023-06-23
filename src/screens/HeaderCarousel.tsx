import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '@env';
import MainHeader from 'components/MainHeader/MainHeader';
import Carousel from 'react-native-reanimated-carousel';
import {WINDOW_WIDTH, rowCenter} from 'utils/mixins';
import {h1, h5} from 'utils/styles';
import {getBanners} from 'store/effects/productStore';
import {Banners} from 'types/products.types';

const HeaderCarousel = () => {
  const [banners, setBanners] = useState<Banners[]>([]);

  useEffect(() => {
    getBannersApi();
    return () => {};
  }, []);

  const getBannersApi = async () => {
    let resFav = await getBanners();
    resFav = resFav;
    setBanners(resFav?.rs?.DATA);
    // console.log('res = ', resFav);
  };
  return (
    <View>
      <MainHeader />
      <View style={{marginTop: -30}}>
        <Carousel
          loop
          width={WINDOW_WIDTH}
          height={WINDOW_WIDTH / 2}
          autoPlay={true}
          data={[...banners]}
          scrollAnimationDuration={1000}
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item, index}) => (
            <View
              style={[
                rowCenter,
                styles.sliderImgWrapper,
                {marginHorizontal: 10},
              ]}>
              <View style={{padding: 20, width: '60%'}}>
                <Text style={[h1, {color: '#fff'}]}>{item?.BANNER_NAME}</Text>
                <Text style={[h5, {color: '#fff'}]}>
                  {item?.BANNER_DESCRIPTION}
                </Text>
                <View style={styles.boxService}>
                  <Text style={[h1, {color: '#fff'}]}>See All services</Text>
                </View>
              </View>
              <Image
                source={{uri: BASE_URL + '/' + item?.BANNER_IMAGE}}
                style={{
                  width: 100,
                  height: 120,
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HeaderCarousel;

const styles = StyleSheet.create({
  sliderImgWrapper: {
    // width: WINDOW_WIDTH,
    // height: 150,
    backgroundColor: '#000',
    // marginRight: 10,
    // marginLeft: 0,
    // paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  boxService: {
    borderWidth: 3,
    borderColor: 'yellow',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginTop: 10,
  },
});
