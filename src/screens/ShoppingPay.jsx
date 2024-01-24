import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import React, { useState, useMemo,useEffect } from 'react'
import RadioGroup from 'react-native-radio-buttons-group';
import Font from "../constants/Font";
import Animated, { Easing, useSharedValue, withSpring, withTiming, FadeInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import { CheckBox } from '@rneui/themed';
import { selectTotalPrice, selectTotalDiscountAmount } from '../redux/cartSlice';
import { useSelector } from 'react-redux';

export default function ShoppingPay() {
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

    const handleCheck1 = () => {
        setSelectedCheck1(!selectedCheck1);
    };

    const handleCheck2 = () => {
        setSelectedCheck2(!selectedCheck2);
    };

    useEffect(() => {
        // Component ilk render olduğunda yapılacak işlemler
        height.value = withTiming(0, { duration: 0 }); // Accordion 1
        height2.value = withTiming(0, { duration: 0 }); // Accordion 2
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const height = useSharedValue(0);


    const toggleAccordion = () => {
        height.value = withTiming(isOpen ? 0 : 118, { duration: 250, easing: Easing.ease });
        setIsOpen(!isOpen);
    };
    const [isOpen2, setIsOpen2] = useState(false);

    const height2 = useSharedValue(0);


    const toggleAccordion2 = () => {
        height2.value = withTiming(isOpen2 ? 0 : 40, { duration: 300, easing: Easing.ease });
        setIsOpen2(!isOpen2);
    };

    return (
        <ScrollView>
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
                                        size={25}
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


                        <Animated.View style={{ height: height, borderWidth: isOpen ? 1 : 0, borderRadius: 20, borderColor: 'rgba(128, 185, 5,0.3)', opacity: isOpen ? 1 : 0 }} >
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
                        <TouchableOpacity onPress={toggleAccordion2} style={[styles.accordionView2, { borderBottomWidth: isOpen2 ? 0 : 1, }]}>
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
                                    <Animated.Text entering={FadeInDown.duration(600).springify()} style={[styles.accordionPrice, { color: '#80B905' }]}>- ₺{earningPrice.toFixed(2)}</Animated.Text>
                                </View> : null}
                            </View>
                        </TouchableOpacity>

                        <Animated.View style={{ height: height2, borderWidth: isOpen2 ? 1 : 0, borderRadius: 20, borderColor: 'rgba(128, 185, 5,0.3)', opacity: isOpen2 ? 1 : 0, justifyContent: 'center' }}>
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


                                <Text style={[styles.accordionPrice, { color: '#80B905' }]}>- ₺{earningPrice.toFixed(2)}</Text>

                            </View>

                        </Animated.View>
                    </View>



                </View>

            </View>


        </ScrollView>
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: Font["poppins-regular"],
        height: '100%',
        paddingVertical: 30
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
        paddingTop: 15
    },
    input: {
        width: '90%',
        paddingVertical: 20,

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
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: 'rgba(128, 185, 5,0.3)',

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
    }


})