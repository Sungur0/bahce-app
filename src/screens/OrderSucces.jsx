import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import Font from "../constants/Font";

export default function OrderSucces({ navigation }) {
    const [showLottie, setShowLottie] = useState(false);

    useEffect(() => {
        const delay = 150;

        const timerToShowLottie = setTimeout(() => {
            setShowLottie(true);
        }, delay);

        // const timerToNavigate = setTimeout(() => {
        //     navigation.navigate('Home');
        // }, delay + 5000); // animasyon gösterildikten 5 saniye sonra ekrana dönsün

        return () => {
            clearTimeout(timerToShowLottie);
            // clearTimeout(timerToNavigate);
        };
    }, [navigation]);
    return (
        <View style={styles.container}>
            {showLottie && (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <LottieView style={{ width: 350, height: 350 }} source={require('../../assets/succes.json')} autoPlay loop={false} />
                    <Text style={styles.text}> Siparişin Tamamlandı!</Text>
                </View>

            )}
            {showLottie && (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 100,
                    width: '100%'
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.text2}>Ana sayfaya dön</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  >
                        <Text style={styles.text2}>Siparişe git</Text>
                    </TouchableOpacity>


                </View>
            )}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    text: {
        fontFamily: Font["poppins-bold"],
        color: '#23B26D',
        fontSize: 25
    },
    text2: {
        fontFamily: Font["poppins-bold"],
    }
})