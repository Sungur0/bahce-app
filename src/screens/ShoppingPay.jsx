import { View, Text, StyleSheet, ScrollView, SafeAreaView, Modal, TouchableOpacity, TextInput, } from 'react-native'
import React, { useState } from 'react'
import Font from "../constants/Font";

export default function ShoppingPay() {
    const [noteValue, setNoteValue] = useState('');
    const [isNoteVisible, setIsNoteVisible] = useState(false);

    const handleNotePress = () => {
        setIsNoteVisible(true);
    };

    const handleNoteChange = (text) => {
        setNoteValue(text);
    };

    const handleNoteSave = () => {
        // Burada notu kaydetme veya işleme alma işlemlerini ekleyebilirsiniz
        setIsNoteVisible(false);
    };

    const handleNoteCancel = () => {
        setIsNoteVisible(false);
        setNoteValue(''); // İptal edildiğinde not değerini sıfırla
    };



    return (
        <ScrollView >

            <View style={styles.container}>
                <View style={styles.noteAddInput} >

                    <Text style={{ paddingHorizontal: 10, paddingVertical: 10 }}>Not Ekle</Text>

                    <TouchableOpacity style={styles.note} onPress={handleNotePress}>
                        <Text style={styles.noteInputs}>
                            {noteValue !== '' ? noteValue : 'Sipariş notunu buraya yazabilirsin.'}
                        </Text>

                    </TouchableOpacity>

                    <View style={styles.dropdownInput}>
                        {isNoteVisible && (
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Sipariş notunu buraya yazınız."
                                        onChangeText={handleNoteChange}
                                        multiline={true}
                                        value={noteValue}
                                    />
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.saveButton} onPress={handleNoteSave}>
                                            <Text>Kaydet</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.cancelButton} onPress={handleNoteCancel}>
                                            <Text>İptal</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}

                    </View>

                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fff', height: '95%' }}>
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
        fontFamily: Font["poppins-regular"],
        height: '100%',
        position:'relative'
    },

    noteAddInput: {
        width: '100%',
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
        height: '95%',
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
    checkText: {
        paddingLeft: 8,
        color: 'grey'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        width:'75%',
        alignItems:'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    input: {
        width:'75%',

    },
    buttonContainer: {
        width:'75%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    saveButton: {
        // Kaydet butonu için stiller
    },
    cancelButton: {
        // İptal butonu için stiller
    },

})