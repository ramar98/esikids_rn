import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { colores } from '../colores';

export function ButtonStart(props) {
    const { text, rol, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button,{backgroundColor: rol === 'student' ? colores.color4 : colores.color13,}]}>
            <Text style={styles.buttonText}>{text}</Text>
            {rol === 'student' && <Image style={styles.flecha} source={require('../assets/images/flecha_student.png')} />}
            {rol === 'teacher' && <Image style={styles.flecha} source={require('../assets/images/flecha_teacher.png')} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '50%',
        height: 35,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        marginRight: 15,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    flecha: {
        width: 25,
        height: 25,
        marginTop: 5,
        marginRight: -5
    },
});