import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import React, { useState, useMemo } from 'react'
import RadioGroup from 'react-native-radio-buttons-group';
import Font from "../constants/Font";
import Animated, { Easing, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import { CheckBox } from '@rneui/themed';
import { selectTotalPrice, selectTotalDiscountAmount } from '../redux/cartSlice';
import { useSelector } from 'react-redux';

export default function ShoppingPay() {
    const userId = useSelector((state) => state.user.user.userId);

    const totalPrice = useSelector(state => selectTotalPrice(state, userId));

    const totalDiscountPrice = useSelector(state => selectTotalDiscountAmount(state, userId))


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


    const [isOpen, setIsOpen] = useState(false);

    const height = useSharedValue(0);

    const toggleAccordion = () => {
        height.value = withTiming(isOpen ? 0 : 100, { duration: 300, easing: Easing.ease });

        setIsOpen(!isOpen);
    };

    const [isOpen2, setIsOpen2] = useState(false);

    const height2 = useSharedValue(0);

    const toggleAccordion2 = () => {
        height2.value = withTiming(isOpen2 ? 0 : 100, { duration: 300, easing: Easing.ease });

        setIsOpen2(!isOpen2);
    };


    return (
        <ScrollView >

            <View style={styles.container}>
                <View style={styles.noteAddInput} >


                    <Text style={styles.header}>Not Ekle</Text>

                    <TouchableOpacity style={styles.note}>
                        <TextInput
                            style={styles.input}
                            placeholder="Sipariş notunu buraya yazınız."
                            onChangeText={handleNoteChange}
                            multiline={true}
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
                        <TouchableOpacity onPress={toggleAccordion}>
                            <Text>Sipariş Toplamı</Text>
                        </TouchableOpacity>

                        <Animated.View style={{ height: height }}>
                            <Text>Accordion İçeriği</Text>
                        </Animated.View>

                    </View>
                    <View style={styles.accordion}>
                        <TouchableOpacity onPress={toggleAccordion2}>
                            <Text>Sipariş</Text>
                        </TouchableOpacity>

                        <Animated.View style={{ height: height2 }}>
                            <Text>Accordion İçeriği</Text>
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
        borderColor: '#80B905',
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
    }


})