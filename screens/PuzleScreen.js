import { React, useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, Image, Text, FlatList, TouchableOpacity, Modal, Button } from 'react-native'
import { stages } from '../components/puzleStages';
import { colores } from '../colores';
const defaultBackground = require('../assets/images/fondoesikidsv.png');
const styleImageSelected = { width: 80, height: 80, margin: 10, alignSelf: 'center' }
const styleTouchableSelected = { alignSelf: 'center', margin: 5, borderWidth: 2, width: 60, height: 90, justifyContent: 'center' }
const styleImagePuzle = { width: 111, height: 171, margin: 10, alignSelf: 'center' }
const styleTouchablePuzle = { alignSelf: 'center', margin: 1, borderWidth: 2, width: 116, height: 174, justifyContent: 'center' }
let numeroStage = 0;

function PuzleScreen({ route, navigation }) {

    const stage = route.params;
    numeroStage = stage;

    const ImagesSelected = [
        {
            id: 1,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila1columna1
        },
        {
            id: 2,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila1columna2
        },
        {
            id: 3,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila1columna3
        },
        {
            id: 4,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila2columna1
        },
        {
            id: 5,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila2columna2
        },
        {
            id: 6,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila2columna3
        },
        {
            id: 7,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila3columna1
        },
        {
            id: 8,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila3columna2
        },
        {
            id: 9,
            styleImageSelected: styleImageSelected,
            styleTouchableSelected: styleTouchableSelected,
            adress: stages[numeroStage].fila3columna3
        },
    ]
    const ImagesPuzle = [
        {
            id: 1,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
        {
            id: 2,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
        {
            id: 3,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
        {
            id: 4,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
        {
            id: 5,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
        {
            id: 6,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
        {
            id: 7,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
        {
            id: 8,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
        {
            id: 9,
            styleImagePuzle: styleImagePuzle,
            styleTouchablePuzle: styleTouchablePuzle,
            adress: defaultBackground
        },
    ]
    const orden = [
        { adress: stages[numeroStage].fila1columna1 },
        { adress: stages[numeroStage].fila1columna2 },
        { adress: stages[numeroStage].fila1columna3 },
        { adress: stages[numeroStage].fila2columna1 },
        { adress: stages[numeroStage].fila2columna2 },
        { adress: stages[numeroStage].fila2columna3 },
        { adress: stages[numeroStage].fila3columna1 },
        { adress: stages[numeroStage].fila3columna2 },
        { adress: stages[numeroStage].fila3columna3 }
    ]
    const desordenarLista = (lista) => {

        return lista.sort(function (a, b) {

            return Math.random() - 0.5;
        });
    }
    const [dataPuzle, setDataPuzle] = useState(ImagesPuzle)
    const [dataSelected, setDataSelected] = useState(desordenarLista(ImagesSelected))
    const [requireImageSelected, setRequireImageSelected] = useState()
    const [imageSelected, setImageSelected] = useState()
    const [longitudSelected, setLongitudSelected] = useState(9)
    const [modalVisible, setModalVisible] = useState(false)
    const [iniciarVisible, setIniciarVisible] = useState(true)
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const pressImagesSelected = (item) => {
        setImageSelected(item)
        setRequireImageSelected(item.adress)
        const newDataSelected = dataSelected.map(newItem => {
            if (item.id == newItem.id) {
                newItem.styleImageSelected = { width: 100, height: 100, margin: 10, alignSelf: 'center' }
                newItem.styleTouchableSelected = { alignSelf: 'center', margin: 5, borderWidth: 2, width: 70, height: 110, justifyContent: 'center', borderColor: 'blue' }
                return newItem
            }
            else {
                newItem.styleImageSelected = styleImageSelected
                newItem.styleTouchableSelected = styleTouchableSelected;
                return newItem
            }
        })
        setDataSelected(newDataSelected)
    }
    const pressImagesPuzle = (item) => {
        if (requireImageSelected != null && item.adress == defaultBackground) {
            const newDataPuzle = dataPuzle.map(newItem => {
                if (item.id == newItem.id) {
                    newItem.adress = requireImageSelected
                    return newItem
                }
                return newItem
            })
            const newDataSelected = dataSelected.filter(item => item !== imageSelected)
            setLongitudSelected(longitudSelected - 1)
            setDataPuzle(newDataPuzle)
            setDataSelected(newDataSelected)
            setRequireImageSelected()
            if (longitudSelected <= 1 && verificarPuzle(newDataPuzle)) {
                puzleCorrecto();
            }
        }
    }
    const longPressImagesPuzle = (item) => {
        if (longitudSelected < 9 && item.adress != defaultBackground) {
            var i = 1;
            const newItem = {
                id: 10,
                styleImageSelected: styleImageSelected,
                styleTouchableSelected: styleTouchableSelected,
                adress: item.adress
            }
            dataSelected.unshift(newItem);
            const newDataSelected = dataSelected.map(newItemSelected => {
                newItemSelected.id = i;
                i++;
                return newItemSelected
            })
            const newDataPuzle = dataPuzle.map(newItemPuzle => {
                if (item.id == newItemPuzle.id) {
                    newItemPuzle.adress = defaultBackground
                    return newItemPuzle
                }
                return newItemPuzle
            })
            setLongitudSelected(longitudSelected + 1)
            setDataSelected(newDataSelected)
            setDataPuzle(newDataPuzle)
        }
    }
    const verificarPuzle = (data) => {
        var correcto = true;
        var i = 0;
        data.map(item => {
            if (item.adress != orden[i].adress) {
                correcto = false;
            }
            i++;
        })
        return correcto
    }
    const puzleCorrecto = () => {
        stopTimer();
        setModalVisible(true);
    }

    const finalizarGame = () =>{
        setModalVisible(false)
        navigation.navigate('PuzleStages')
    }

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000); // Actualizar cada segundo
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const startTimer = () => {
        setIniciarVisible(false)
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsActive(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/fondogames.jpg')} resizeMode='cover' style={styles.image}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, margin: 10 }} >Felicitaciones!!!</Text>
                        <Button title='Continuar' onPress={() => finalizarGame()} />
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={iniciarVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalInicio}>
                        <Text style={{ fontSize: 25, margin: 10, color: colores.color2 }} >Presione para comenzar</Text>
                        <TouchableOpacity style={styles.btnIniciar} onPress={() => startTimer()}>
                            <Text style = {{fontSize:15, color: colores.color2, marginTop:8}}>Iniciar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={styles.header}>
                    <Text style={styles.timer}>{formatTime(seconds)}</Text>
                </View>
                <View style={styles.puzle}>
                    <FlatList
                        data={dataPuzle}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => pressImagesPuzle(item)} onLongPress={() => longPressImagesPuzle(item)} style={item.styleTouchablePuzle}>
                                <Image style={item.styleImagePuzle} source={item.adress} resizeMode='contain' />
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.footer}>
                    <FlatList
                        data={dataSelected}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => pressImagesSelected(item)} style={item.styleTouchableSelected}>
                                <Image style={item.styleImageSelected} source={item.adress} resizeMode='contain' />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ImageBackground>

        </View>
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
    imagesPuzle: {
        width: 100,
        height: 100,
    },
    timer: {
        fontSize: 30,
        color: colores.color2,
        fontWeight: 'bold',
        position:'absolute',
        bottom: 30,
        left: 30

    },
    modalView: {
        width: 300,
        height: 150,
        top: 350,
        borderRadius: 30,
        backgroundColor: colores.color3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    modalInicio: {
        width: 300,
        height: 150,
        top: 350,
        borderRadius: 30,
        backgroundColor: colores.color7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnIniciar:{
        width: 70,
        height: 40,
        borderRadius:15,
        backgroundColor: colores.color1,
        alignItems: 'center'
    },
    footer: {
        padding: 5,
        width: '95%',
        height: '15%',
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 3,
        backgroundColor: colores.color1

    },
    header: {
        marginTop: 10,
        width: '95%',
        height: 100,
        alignSelf: 'center',
        backgroundColor: colores.color1,
        borderRadius: 20,
        borderWidth:3
    },
    puzle: {
        borderWidth:3,
        alignItems: 'center',
        padding: 12,
        borderRadius: 20,
        margin: 10,
        width: '95%',
        height: '68%',
        backgroundColor: colores.color1,
        alignSelf: 'center'
    }

});

export default PuzleScreen;