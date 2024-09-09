import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { colores } from '../colores'
const ChoiseUserScreen = ({ navigation }) => {

    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <ScrollView style={{ flex: 1 }}>
                <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
                <View style={styles.rectangule1}>
                    <Text style={styles.text1}>¡Regístrate para jugar y aprender con nosotros!</Text>
                </View>
                <Text style={styles.text2}>¿Qué tipo de usuario eres?</Text>
                <TouchableOpacity style={[styles.rectangule2, { backgroundColor: colores.color13 }]} onPress={() => navigation.navigate('RegisterStudent')}>
                    <Image style={{width:102, height:102}} source={require('../assets/images/student_icon.png')} />
                    <Text style={styles.text3}>ALUMNO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rectangule2, { backgroundColor: colores.color4 }]} onPress={() => navigation.navigate('RegisterTeacher')}>
                    <Image source={require('../assets/images/teacher_icon.png')} />
                    <Text style={[styles.text3, { marginLeft: 10 }]}>DOCENTE</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={styles.text4}>¿Ya tienes una cuenta? </Text>
                    <Text style={[styles.text4, { color: colores.color9, textDecorationLine:'underline' }]} onPress={() => navigation.navigate('Login')} >Ingresa aquí.</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1
    },
    logoESIKids: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: -10
    },
    text1: {
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: 'bold',
        padding: 2
    },
    text2: {
        marginTop: 20,
        color: colores.color4,
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '900',
    },
    text3: {
        textDecorationLine: 'underline',
        color: colores.color12,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    text4: {
        marginTop: 30,
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    rectangule1: {
        backgroundColor: colores.color3,
        borderRadius: 10,
        width: '70%',
        alignSelf: 'center',
        marginTop: 30
    },
    rectangule2: {
        borderRadius: 10,
        width: '55%',
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',
    }
});

export default ChoiseUserScreen;