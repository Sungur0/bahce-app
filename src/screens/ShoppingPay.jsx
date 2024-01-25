import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Font from "../constants/Font";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo'
import { LinearGradient } from 'expo-linear-gradient';

import { CheckBox } from '@rneui/themed';
import { selectTotalPrice, selectTotalDiscountAmount } from '../redux/cartSlice';
import { useSelector } from 'react-redux';

export default function ShoppingPay({ navigation }) {
    const userId = useSelector((state) => state.user.user.userId);

    const totalPrice = useSelector(state => selectTotalPrice(state, userId));

    const totalDiscountPrice = useSelector(state => selectTotalDiscountAmount(state, userId))

    const earningPrice = totalDiscountPrice - totalPrice

    const [noteValue, setNoteValue] = useState('');


    const handleNoteChange = (text) => {
        setNoteValue(text);
    };


    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };


    const [selectedCheck1, setSelectedCheck1] = useState(false);
    const [selectedCheck2, setSelectedCheck2] = useState(false);
    const [selectedCheck3, setSelectedCheck3] = useState(false);


    const handleCheck1 = () => {
        setSelectedCheck1(!selectedCheck1);
    };

    const handleCheck2 = () => {
        setSelectedCheck2(!selectedCheck2);
    };

    const handleCheck3 = () => {
        setSelectedCheck3(!selectedCheck3);
    };



    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const height = useSharedValue(0);
    const height2 = useSharedValue(0);

    const toggleAccordion = () => {
        height.value = withTiming(isOpen ? 0 : 118, { duration: 250, easing: Easing.ease });

        setIsOpen((prev) => !prev);
    };

    const toggleAccordion2 = () => {
        height2.value = withTiming(isOpen2 ? 0 : 40, { duration: 200, easing: Easing.ease });

        setIsOpen2((prev) => !prev);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
        };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            height: height2.value,
        };
    });



    const handleSiparisVer = () => {
        // Siparişi ver işlemleri burada yapılır
        // Önce checkbox'ın seçili olup olmadığını kontrol et
        if (selectedCheck3) {
            navigation.navigate('Sipariş Tamamlama');
            console.log("Sipariş verildi!");
        } else {
            // Checkbox seçili değilse, kullanıcıyı uyar veya başka bir işlem yap
            console.log("Önce sözleşmeyi kabul etmelisiniz.");
        }
    };

    return (
        <View>
            <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.noteAddInput} >


                        <Text style={styles.header}>Not Ekle</Text>

                        <TouchableOpacity style={styles.note}>
                            <TextInput
                                style={styles.input}
                                placeholder="Sipariş notunu buraya yazınız."
                                onChangeText={handleNoteChange}
                                maxLength={70}
                                value={noteValue}
                            />
                        </TouchableOpacity>



                        <View style={{ flex: 1, width: '100%', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff', height: '95%' }}>
                            <View style={styles.checkBox}>

                                <TouchableOpacity style={styles.checkTextContainer}>
                                    <CheckBox
                                        title={<Text style={styles.checkText}>Siparişi Kapıya Bırak</Text>}
                                        checked={selectedCheck1}
                                        onPress={handleCheck1}
                                        checkedColor='#80B905'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.checkTextContainer} >
                                    <CheckBox
                                        title={<Text style={styles.checkText}>Zili çalma</Text>}
                                        checked={selectedCheck2}
                                        onPress={handleCheck2}
                                        checkedColor='#80B905'
                                    />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <View style={styles.paymentMethods}>
                        <Text style={styles.header}>Ödeme Yöntemi</Text>
                        <View>

                            <CheckBox
                                title={
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                                        <Icon
                                            name='credit-card'
                                            type="material"
                                            size={25}
                                            iconStyle={{ marginRight: 10, }}
                                        />
                                        <Text style={{ paddingHorizontal: 10, fontFamily: Font["poppins-regular"] }}>Kredi Kartı İle Ödeme</Text>
                                    </View>
                                }
                                checkedIcon={
                                    <Icon
                                        name="dot-circle-o"
                                        type="material"
                                        color='#80B905'
                                        size={25}
                                        iconStyle={{ marginRight: 10 }}
                                    />
                                }
                                uncheckedIcon={
                                    <Icon
                                        name="circle-o"
                                        type="material"
                                        color='#80B905'
                                        size={25}
                                        iconStyle={{ marginRight: 10 }}
                                    />
                                }
                                checked={selectedOption === 'option1'}
                                onPress={() => handleOptionSelect('option1')}
                            />
                            <CheckBox
                                title={
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                                        <Icon
                                            name='home'
                                            type="material"
                                            size={22}
                                            iconStyle={{ marginRight: 10, }}
                                        />
                                        <Text style={{ paddingHorizontal: 15, fontFamily: Font["poppins-regular"] }}>Kapıda Ödeme</Text>
                                    </View>
                                }
                                checkedIcon={
                                    <Icon
                                        name="dot-circle-o"
                                        type="material"
                                        color='#80B905'
                                        size={25}
                                        iconStyle={{ marginRight: 10 }}
                                    />
                                }
                                uncheckedIcon={
                                    <Icon
                                        name="circle-o"
                                        type="material"
                                        color='#80B905'
                                        size={25}
                                        iconStyle={{ marginRight: 10 }}
                                    />
                                }
                                checked={selectedOption === 'option2'}
                                onPress={() => handleOptionSelect('option2')}
                            />


                        </View>

                    </View>
                    <View style={styles.paymentSummary}>
                        <Text style={styles.header}>Ödeme Özeti</Text>


                        <View>
                            <TouchableOpacity style={styles.addCoupon}>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon
                                        name="ticket"
                                        type="material"
                                        color='#80B905'
                                        size={25}
                                        iconStyle={{ marginRight: 10 }}
                                    />
                                    <Text style={styles.couponText}>Hediye Kuponu Ekle</Text>
                                </View>
                                <View>

                                    <Icon2
                                        name="arrow-forward-ios"
                                        type="material"
                                        size={20}
                                        color='#80B905'
                                        iconStyle={{ marginRight: 10 }}
                                    />


                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.accordion}>
                            <TouchableOpacity onPress={toggleAccordion} style={[styles.accordionView, { borderBottomWidth: isOpen ? 0 : 1, }]}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={styles.accordionText}>Sipariş Toplamı</Text>
                                    <View style={{ backgroundColor: 'rgba(128, 185, 5,0.2)', marginLeft: 10, borderRadius: 50 }}>
                                        <Icon2
                                            name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                            color='#80B905'
                                            size={20}
                                        />
                                    </View>

                                </View>


                                {!isOpen ? <View>
                                    <Animated.Text style={styles.accordionPrice} entering={FadeInDown.duration(600).springify()}>₺{totalDiscountPrice.toFixed(2)}</Animated.Text>
                                </View> : null}


                            </TouchableOpacity>


                            <Animated.View style={[animatedStyle, { height: height, borderWidth: isOpen ? 1 : 0, borderRadius: 20, borderColor: 'rgba(128, 185, 5,0.3)', opacity: isOpen ? 1 : 0 }]} >
                                <View style={styles.accordionMenuViews}>
                                    <Text style={styles.text1}>Ürünler</Text>
                                    <Text style={styles.text1}>₺{totalDiscountPrice.toFixed(2)}</Text>
                                </View>

                                <View style={styles.accordionMenuViews}>
                                    <Text style={styles.text1}>Kargo Ücreti</Text>
                                    <Text style={styles.text1}>-₺<Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}> 24,99</Text> Ücretsiz</Text>
                                </View>

                                <TouchableOpacity>
                                    <View style={[styles.accordionMenuViews, { backgroundColor: 'rgba(128, 185, 5,0.2)', paddingHorizontal: 10 }]}>
                                        <Text style={styles.text1}>Ücret Detayları</Text>
                                        <Icon2
                                            name={"keyboard-arrow-right"}
                                            color='#80B905'
                                            size={20}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.accordionMenuViews}>
                                    <Text style={{ fontFamily: Font["poppins-regular"], fontSize: 13 }}>Alt Toplam</Text>
                                    <Text style={[styles.text1, { color: '#000' }]}>₺{totalDiscountPrice.toFixed(2)}</Text>
                                </View>
                            </Animated.View>



                        </View>


                        <View style={styles.accordion}>
                            <TouchableOpacity onPress={toggleAccordion2} style={styles.accordionView2}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                    <Text style={styles.accordionText}>Kazancın</Text>
                                    <View style={{ backgroundColor: 'rgba(128, 185, 5,0.2)', marginLeft: 10, borderRadius: 50 }}>
                                        <Icon2
                                            name={isOpen2 ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                            color='#80B905'
                                            size={20}
                                        />
                                    </View>
                                </View>

                                <View>
                                    {!isOpen2 ? <View>
                                        <Animated.Text entering={FadeInDown.duration(600).springify()} style={[styles.accordionPrice, { color: '#F3A13B' }]}> ₺{earningPrice.toFixed(2)}</Animated.Text>
                                    </View> : null}
                                </View>
                            </TouchableOpacity>

                            <Animated.View style={[animatedStyle2, { height: height2, borderWidth: isOpen2 ? 1 : 0, borderRadius: 20, borderColor: 'rgba(128, 185, 5,0.3)', opacity: isOpen2 ? 1 : 0, justifyContent: 'center' }]}>
                                <View style={styles.accordionMenuViews}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon3
                                            name="check"
                                            type="material"
                                            size={20}
                                            color='#80B905'
                                        />
                                        <Text style={styles.text1}>Kazançlı Ürünler</Text>

                                    </View>


                                    <Text style={[styles.accordionPrice, { color: '#F3A13B' }]}> ₺{earningPrice.toFixed(2)}</Text>

                                </View>

                            </Animated.View>
                        </View>


                        <View style={{ paddingHorizontal: 10, }}>
                            <View style={{ borderBottomWidth: 1, borderColor: 'rgba(128, 185, 5,0.3)', borderTopWidth: isOpen2 ? 0 : 1, }}>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }}  // Başlangıç noktası sol üst köşe
                                    end={{ x: 1, y: 0 }} // Bitiş noktası sağ üst köşe
                                    colors={['rgba(255, 255, 255, 0.5)', 'rgba(128,185,5,0.2)', 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.6)']} style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.gradientText}>
                                        Toplam
                                    </Text>
                                    <Text style={styles.gradientText}>
                                        ₺{totalPrice.toFixed(2)}
                                    </Text>
                                </LinearGradient>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                            <CheckBox
                                title={<Text style={[styles.checkText, { fontSize: 12 }]}><Text style={{ color: '#80B905' }}>Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesi</Text>'ni okudum ve kabul ediyorum.</Text>}
                                checked={selectedCheck3}
                                onPress={handleCheck3}
                                checkedColor='#F3A13B'
                                required={true}
                            />
                        </View>

                    </View>


                </View>


            </ScrollView>
            <View style={styles.bottomContainer}>
                <Animated.View
                    style={{ width: '100%', flex: 1, alignItems: 'center' }}
                    entering={FadeInDown.duration(1000).springify()} >
                    <TouchableOpacity style={styles.sepeteEkleButton} onPress={handleSiparisVer} >
                        <Text style={styles.sepeteEkleText} >Siparişi Ver</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>

    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: Font["poppins-regular"],
        height: '100%',
        paddingVertical: 30,
        paddingBottom: 100,
        position: 'releative'
    },
    bottomContainer: {

        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingVertical: 15,
        paddingBottom: 40,
        right: 0,
        backgroundColor: '#fff',
    },
    sepeteEkleButton: {
        width: '85%',
        flex: 1,
        backgroundColor: '#80B905',
        alignItems: 'center',
        borderRadius: 10,
    },
    sepeteEkleText: {
        paddingVertical: 15,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Font["poppins-bold"],

    },

    noteAddInput: {
        width: '100%',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    header: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontFamily: Font["poppins-bold"],
    },
    note: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    input: {
        width: '90%',
        paddingVertical: 10,

    },
    noteInputs: {
        width: '92%',
        paddingVertical: 13,
        borderColor: '#80B905',
        color: 'grey'
    },
    checkBox: {
        flexDirection: 'row',
        width: '92%',
        borderTopWidth: 1,
        borderColor: 'rgba(128, 185, 5,0.3)',
    },
    checkTextContainer: {
        height: '95%',
        width: '50%',
        alignItems: 'center',
    },

    checkText: {
        color: 'grey',
        fontFamily: Font["poppins-regular"],
    },
    dropdownCheckBox: {
        flexDirection: 'row',
        width: '90%',
        borderTopWidth: 1,
        borderColor: '#80B905',
    },
    checkTextContainer2: {
        width: '47%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    paymentMethods: {
        backgroundColor: '#fff',
        marginVertical: 30,
        paddingVertical: 15,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    paymentSummary: {
        backgroundColor: '#fff',
        marginVertical: 10,
        paddingVertical: 15,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    addCoupon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    couponText: {
        fontFamily: Font["poppins-regular"],
        paddingHorizontal: 10,
    },
    accordion: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
    accordionView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(128, 185, 5,0.3)',

    },
    accordionView2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

        paddingBottom: 10,


    },
    accordionText: {
        fontSize: 13,
        fontFamily: Font["poppins-regular"],

    },
    accordionPrice: {
        fontFamily: Font["poppins-regular"],

    },
    text1: {
        fontSize: 13,
        color: 'grey',
        fontFamily: Font["poppins-regular"],

    },
    accordionMenuViews: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 0,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    gradientText: {
        fontSize: 14,
        fontFamily: Font["poppins-regular"],
        color: 'rgba(128, 185, 5,1)',
    }


})