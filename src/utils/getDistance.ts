import { PermissionsAndroid } from "react-native";
import GetLocation from "react-native-get-location";
import { IStore } from "types/products.types";

function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
): number {
    const R = 6371; // Radius Bumi dalam kilometer
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Konversi ke meter

    return distance;
}

function degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

//   async function name(params:type) {

//   }

async function getLocation() {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: 'App Location Permission',
            message: 'App needs access to your location ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        let location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        return location;
    }
};

export {
    getLocation,
    calculateDistance
}