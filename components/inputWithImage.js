import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colores } from '../colores';

export function InputWithImage (props) {
    const { imageSource, placeholder, value, onChangeText, isPassword, onTouchStart, editable } = props;

    const [isSecure, setIsSecure] = useState(isPassword);

    const toggleSecureEntry = () => {
        setIsSecure(!isSecure);
    };

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.image} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isSecure}
                onTouchStart={onTouchStart}
                editable={editable}
            />
            {isPassword && (
                <TouchableOpacity onPress={toggleSecureEntry}>
                    <Image
                        source={isSecure ? require('../assets/images/mostrar_logo.png') : require('../assets/images/ocultar_logo.png')}
                        style={styles.toggleIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colores.color1,
        backgroundColor: colores.color12,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
        alignSelf: 'center',
        width: '85%',
    },
    image: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        marginRight: 10,
    },
    input: {
        height: 42,
        width: '70%',
    },
    toggleIcon: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        marginLeft: 10,
    },
});
