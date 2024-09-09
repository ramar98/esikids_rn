import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colores } from '../colores'

export function ButtonLogIn(props) {
    const { onPress, text, marginBottom } = props

    return (
        <TouchableOpacity onPress={onPress} style={[styles.InputEmail, {marginBottom:marginBottom}]}>
            <Text style={styles.texto}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    InputEmail: {
        backgroundColor: colores.color9,
        alignSelf: 'center',
        width: '45%',
        height: 40, 
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        fontWeight: '800',
        color: colores.color12,
        fontSize: 20,
    }
})