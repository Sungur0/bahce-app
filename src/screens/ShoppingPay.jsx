import { View, Text, StyleSheet, ScrollView, SafeAreaView, Modal, TouchableOpacity, TextInput, } from 'react-native'
import React, { useState } from 'react'
import Font from "../constants/Font";

export default function ShoppingPay() {



    return (
            <ScrollView >
                <View style={styles.container}>

                    <View style={styles.noteAddInput} >

                        <Text style={{ paddingHorizontal: 10, paddingVertical: 10 }}>Not Ekle</Text>

                        <TouchableOpacity style={styles.note}>
                            <Text style={styles.noteInputs}>
                                {/* {notevalue} */}
                                'Sipariş notunu buraya yazabilirsin.'
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1, width: '100%', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff', height:'95%' }}>
                            <View style={styles.checkBox}>
                                <TouchableOpacity style={[styles.checkTextContainer,]}>
                                    <Text style={styles.check}></Text>
                                    <Text style={styles.checkText}>Siparişi Kapıya Bırak</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.checkTextContainer}>
                                    <Text style={styles.check}></Text>
                                    <Text style={styles.checkText}>Zili çalma</Text>
                                </TouchableOpacity>

                            </View>

                        </View>



                    </View>
                </View>


            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: Font["poppins-regular"]
    },
    noteAddInput: {
        paddingVertical: 40,
        width: '100%'
    },
    note: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
        height:'95%',
        width: '50%',
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    check: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#80B905',
    },
    checkText:{
        paddingLeft:8,
        color:'grey'
    }

})