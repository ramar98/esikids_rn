import React from 'react'
import { Image, TextInput, StyleSheet, SafeAreaView } from 'react-native'
import { colores } from '../colores'

export function InputImage(props) {
    const { color, text, onChangeText, image } = props
    return (
        <SafeAreaView style={styles.InputEmail}>
            <Image source={image} style={styles.loginIcon} resizeMode='contain' tintColor={'#0097B2'} />
            <TextInput style={styles.input} onChangeText = {onChangeText} placeholder={text} placeholderTextColor={color} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    InputEmail: {
        alignSelf:'center',
        width:350,
        height: 50,
        margin:10,
        flexDirection: 'row',
        borderWidth:3,
        borderColor: colores.color1,
        borderRadius:20
    },
    loginIcon: {
        width:25,
        height:25,
        margin:10,
        marginLeft: 10,
        alignSelf: 'center',
    },
    input: {
        marginTop:-1,
        paddingLeft:20,
        height: 48,
        width: 310,
        borderWidth: 2,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: colores.color1
    },
})