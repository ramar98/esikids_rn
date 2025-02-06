import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colores } from '../colores';

export function Course(props) {
    const { courseName, schoolName, courseAge, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={styles.module}>
            <Image source={require('../assets/images/curso.png')} style={styles.image} />
            <Text style={styles.text1}>{courseName} - {schoolName}</Text>
            <Text style={styles.text1}>Edad del curso: {courseAge}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    module: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '75%',
        padding: 10,
        backgroundColor: colores.color3,
        borderRadius: 30,
        marginBottom: 10,
    },
    text1: {
        color: colores.color14,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        resizeMode: 'contain',
        width: 40,
        height: 40,
        marginRight: 10,
        alignSelf: 'center',
        marginTop: -10,
    },
    input: {
        height: 42,
        width: '70%',
        color: colores.color11,
    },
    toggleIcon: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        marginLeft: 10,
    },
});
