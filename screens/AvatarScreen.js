import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { colores } from '../colores'
import { ButtonLogIn } from '../components/ButtonLogIn'
import { avatars } from '../avatars'
import { url } from '../url'
const AvatarScreen = ({ route, navigation }) => {
    const params = route.params;

    const nombre = params.nombre;
    const apellido = params.apellido;
    const rol = params.rol; 
    const user_id = params.user_id;
    
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    
    const procesar = async () => {
        try {
            const response = await fetch(url +'api/'+ rol + 's/' + user_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    avatar: selectedAvatar, // Assuming you have a state for selectedAvatar
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            navigation.navigate('RegisteredUser', { nombre: nombre, apellido: apellido, rol: rol });
        } catch (error) {
            console.error('Error updating avatar:', error);
        }
    }


    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} style={styles.image}>
            <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
            <View style={styles.rectangule1}>
                <Text style={styles.text1}>¡Selecciona el avatar que más te guste para representarte en los juegos!</Text>
            </View>
            <ScrollView style={{ flex: 1, marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {avatars.map(avatar => (
                        <TouchableOpacity
                            key={avatar.id}
                            style={[
                                styles.circle1,
                                { backgroundColor: avatar.backgroundColor },
                                selectedAvatar === avatar.id && { borderColor: 'black', borderWidth: 3 }
                            ]}
                            onPress={() => setSelectedAvatar(avatar.id)}
                        >
                            <Image style={{ width: 170, height: 170 }} resizeMode='contain' source={avatar.source} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ButtonLogIn text='Omitir' onPress={() => navigation.navigate('RegisteredUser', { nombre: nombre, apellido: apellido, rol: rol })} />
                <ButtonLogIn text='Continuar' onPress={() => procesar()} />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        marginBottom: 10,
    },
    logoESIKids: {
        height: 150,
        width: 150,
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
        width: '80%',
        alignSelf: 'center',
        marginTop: 30
    },
    circle1: {
        alignItems: 'center',
        borderRadius: 100,
        justifyContent: 'center',
        marginHorizontal: 10,
        width: 180,
        height: 180,
        marginTop: 10,
        flexDirection: 'row',
    }
});

export default AvatarScreen;