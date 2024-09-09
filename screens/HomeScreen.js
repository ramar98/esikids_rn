import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import { colores } from "../colores";
import React, { useEffect } from 'react';
import { url } from '../url';

const HomeScreen = ({ navigation, route }) => {
    
    const params = route.params;
     useEffect(() => {
        console.log(params)
    }
    , [])
    return (

        <ImageBackground source={require('../assets/images/fondohome.jpg')} resizeMode='cover' style={styles.image}>
            <View style={styles.header}>
                <View >
                    <Image style={styles.gato} source={require('../assets/images/gatorobot.png')} resizeMode="contain" />

                </View>
                <View>
                    <Text style={styles.text1}>¡Hola {params.studentData.name}!</Text>
                    <Text style={styles.text2}>¿Estás listo para aprender sobre ESI?</Text>
                </View>
            </View>
            <View style={styles.modulos}>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Games')} style={styles.modulo1}>
                        <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 25 }} resizeMode="contain" source={require('../assets/images/joystickhome.png')} />
                        <Text style={styles.text3}>JUEGA Y APRENDE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChatBot')} style={styles.modulo2}>
                        <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 25 }} resizeMode="contain" source={require('../assets/images/bothome.png')} />
                        <Text style={styles.text3}>ASISTENTE VIRTUAL</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Resourcess')} style={styles.modulo3}  >
                        <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 25 }} resizeMode="contain" source={require('../assets/images/resourceshome.png')} />
                        <Text style={styles.text3}>RECURSOS ESI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Progress')} style={styles.modulo4}>
                        <Image style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 25 }} resizeMode="contain" source={require('../assets/images/progresshome.png')} />
                        <Text style={styles.text3}>TUS PROGRESOS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 50,
        width: 380,
        height: 100,
        alignSelf: 'center',
        backgroundColor: colores.color4,
        borderRadius: 20
    },
    modulos: {
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: 380,
        height: 450,
        flexDirection: 'row',
        borderRadius: 20
    },
    modulo1: {
        width: 150,
        height: 180,
        marginBottom: 20,
        backgroundColor: colores.color6,
        borderRadius: 20
    },
    modulo2: {
        width: 150,
        height: 180,
        backgroundColor: colores.color9,
        borderRadius: 20
    },
    modulo3: {
        width: 150,
        height: 180,
        marginBottom: 20,
        backgroundColor: colores.color7,
        borderRadius: 20
    },
    modulo4: {
        width: 150,
        height: 180,
        backgroundColor: colores.color1,
        borderRadius: 20
    },
    gato: {
        width: 120,
        height: 100,
    },
    text1: {
        fontSize: 24,
        margin: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: colores.color2
    },
    text2: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: colores.color2
    },
    text3: {
        margin: 5,
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: colores.color2
    }
})

export default HomeScreen;