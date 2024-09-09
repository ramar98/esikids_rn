import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, Text, ScrollView, TouchableOpacity, Button } from 'react-native'
import { ButtonLogIn } from '../components/ButtonLogIn'
import { colores } from '../colores'
import { url } from '../url'
import { InputWithImage } from '../components/inputWithImage'
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';


const RegisterScreenStudent = ({ navigation }) => {
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [email, setEmail] = useState('')
    const [tutorEmail, setTutorEmail] = useState('')
    const [username, setUsername] = useState('')
    const [nomApe, setNomApe] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    const [fec, setFec] = useState(new Date());
    const [fecha, setFecha] = useState('')
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [error, setError] = useState('')
    const [errorMsj, setErrorMsj] = useState('')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        setFecha(currentDate.toLocaleDateString('en-GB', options));
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const procesar = () => {
        setError('')
        if (nomApe === '') {
            setError('nomApe')
            setErrorMsj('El nombre y apellido es requerido')
            return
        }
        else if (fecha === '') {
            setError('fecha')
            setErrorMsj('La fecha de nacimiento es requerida')
            return
        }
        else if (tutorEmail === '') {
            setError('tutorEmail')
            setErrorMsj('El email del tutor es requerido')
            return
        }
        else if (username === '') {
            setError('username')
            setErrorMsj('El usuario es requerido')
            return
        }
        else if (pass === '') {
            setError('pass')
            setErrorMsj('La contraseña es requerida')
            return
        }
        else if (confirmPass === '') {
            setError('confirmPass')
            setErrorMsj('La confirmación de la contraseña es requerida')
            return
        }
        else if (pass !== confirmPass) {
            setError('confirmPass')
            setErrorMsj('Las contraseñas no coinciden')
            return
        }
        else if (!isChecked) {
            setError('isChecked')
            setErrorMsj('Debes aceptar los términos y condiciones')
            return
        }
        validar()
    }

    const validar = async () => {
        const user = {
            username: username,
            password: pass,
            email: email,
            tutoremail: tutorEmail,
            rol: 'student',
        }
        try {
            const response = await fetch(url + 'api/registerStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const result = await response.json();
            console.log(result);

            if (result.success === true) {
                createStudent(result.id)
                navigation.navigate('RegisteredUser',{nomApe: nomApe, rol: 'student'});
            }
            else if (result.success === false) {
                if (result.key === 'username') {
                    setError('username')
                    setErrorMsj('El usuario ya existe')
                    return
                }
                else if (result.key === 'email') {
                    setError('email')
                    setErrorMsj('El email ya existe')
                    return
                }
            }

        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    }

    const createStudent = async (user_id) => {
        const student = {
            user_id: user_id,
            name: nomApe.split(' ')[0],
            lastname: nomApe.split(' ')[1],
            birthdate: fecha.split('/').reverse().join('-'),
        }
        try {
            const response = await fetch(url + 'api/alumnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error(error);

        }
    }


    return (
        <ImageBackground source={require('../assets/images/fondo1.png')} resizeMode='cover' style={styles.image}>
            <ScrollView>
                <Image source={require('../assets/images/logoEsikids2.png')} style={styles.logoESIKids} />
                <Text style={styles.bienvenido}>Crea tu usuario</Text>
                <Text style={styles.texto1}>Ingresa tus datos para crear tu cuenta.</Text>
                <InputWithImage
                    imageSource={require('../assets/images/user_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Nombre y apellido"
                    value={nomApe}
                    onChangeText={setNomApe}
                />
                {error === 'nomApe' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                <TouchableOpacity onPress={() => showDatepicker()}>
                    <InputWithImage
                        imageSource={require('../assets/images/fec_icon.png')} // Reemplaza con la ruta de tu imagen
                        placeholder="Fecha de nacimiento"
                        value={fecha}
                        editable={false}
                    />
                </TouchableOpacity>
                {error === 'fecha' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={fec}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date()} // Restrict to current date
                    />
                )}
                <InputWithImage
                    imageSource={require('../assets/images/email_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Correo electrónico (opcional)"
                    value={email}
                    onChangeText={setEmail}
                />
                <InputWithImage
                    imageSource={require('../assets/images/email_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Correo electrónico del Tutor"
                    value={tutorEmail}
                    onChangeText={setTutorEmail}
                />
                {error === 'tutorEmail' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                <InputWithImage
                    imageSource={require('../assets/images/user_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                />
                {error === 'username' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                <InputWithImage
                    imageSource={require('../assets/images/pass_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Contraseña"
                    value={pass}
                    onChangeText={setPass}
                    isPassword={true}
                />
                {error === 'pass' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                <InputWithImage
                    imageSource={require('../assets/images/pass_icon.png')} // Reemplaza con la ruta de tu imagen
                    placeholder="Confirmar Contraseña"
                    value={confirmPass}
                    onChangeText={setConfirmPass}
                    isPassword={true}
                />
                {error === 'confirmPass' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -10, marginBottom: 5 }}>{errorMsj}</Text> : null}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <CheckBox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        title="Acepto los términos y condiciones"
                    />
                    <Text style={styles.texto2}>Acepto los </Text>
                    <Text style={styles.texto3}>términos y condiciones</Text>
                </View>
                {error === 'isChecked' ? <Text style={{ color: 'red', textAlign: 'center', marginTop: -5 }}>{errorMsj}</Text> : null}
                <ButtonLogIn text='Registrate' onPress={() => procesar()} />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={styles.texto5}>¿Ya tienes una cuenta? </Text>
                    <Text style={[styles.texto5, { color: colores.color9, textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('ChoiseUser')} >Ingresa aqui.</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    logoESIKids: {
        height: 175,
        width: 175,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    texto1: {
        marginBottom: 15,
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 12.5,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    texto2: {
        color: colores.color11,
        fontFamily: 'DM Sans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    texto3: {
        color: colores.color11,
        textDecorationLine: 'underline',
        fontFamily: 'DM Sans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    texto4: {
        color: colores.color11,
        fontFamily: 'DM Sans',
        fontSize: 11,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    texto5: {
        color: colores.color11,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    bienvenido: {
        color: colores.color1,
        textAlign: 'center',
        fontSize: 35,
        fontStyle: 'normal',
        fontWeight: '700',
    },
    inputLogin: {
        flexDirection: 'row'
    },
    loginIcon: {
        marginLeft: 10,
        alignSelf: 'center',
        width: 25,
        height: 25
    }
});

export default RegisterScreenStudent;