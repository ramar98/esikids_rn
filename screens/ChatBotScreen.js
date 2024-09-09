import React, { Component } from "react";
import { View, StyleSheet, Image, ImageBackground, Text, Button, Linking } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from '../env'
import { colores } from "../colores";
import { Link } from "@react-navigation/native";

const botAvatar = require('../assets/images/chatBot.jpg')
const BOT = {
    _id: 2,
    name: 'Mr Bot',
    avatar: botAvatar
}

class ChatBot extends Component {

    state = {
        messages: [
            {
                _id: 1,
                text: 'Hola soy el bot de ESIKids y estoy aquí para ayudarte! Para comenzar te voy a pedir que me indiques que rol cumples:',
                createdAt: new Date(),
                user: BOT,
                quickReplies: {
                    type: 'radio',
                    keepIt: true,
                    values: [
                        {title: 'Padre/Tutor', value: 'Padre/tutor'},
                        {title: 'Docente', value: 'Docente'},
                        {title: 'Alumno', value: 'Alumno'}
                    ]
                }
            }
        ],
        id: 1,
        name: ''
    }

    abrirLink(url){
        Linking.openURL(url)
    }

    componentDidMount() {
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id,
        );
    }

    handleGoogleResponse(result) {
        let tipoMsg = result.queryResult.fulfillmentMessages[0].text.text[0];

        this.sendBotResponse(result, tipoMsg);
    }

    sendBotResponse(result, tipoMsg) {
        let msg, text, opciones

        switch (tipoMsg) {
            case 'txt':
                text = result.queryResult.fulfillmentMessages[1].text.text[0];
                msg = {
                    _id: this.state.messages.length + 1,
                    text,
                    createdAt: new Date(),
                    user: BOT
                }
                break;

            case 'txt_opc':
                text = result.queryResult.fulfillmentMessages[1].text.text[0];
                lista = []
                opciones = result.queryResult.fulfillmentMessages[2].quickReplies.quickReplies;

                for (let i = 0; i < opciones.length; i++) {
                    const newItem = {
                        title: opciones[i], value: opciones[i]
                    }
                    lista.unshift(newItem);
                }

                msg = {
                    _id: this.state.messages.length + 1,
                    text: text,
                    createdAt: new Date(),
                    user: BOT,
                    quickReplies: {
                        type: 'radio',
                        keepIt: true,
                        values: lista
                    },
                }
                break

            case 'txt_crd':
                text = result.queryResult.fulfillmentMessages[1].text.text[0];
                lista = []
                opciones = result.queryResult.fulfillmentMessages[2].card.buttons;

                for (let i = 0; i < opciones.length; i++) {
                    const newItem = {
                        title: opciones[i].text, value: opciones[i].text
                    }
                    lista.unshift(newItem);
                }

                msg = {
                    _id: this.state.messages.length + 1,
                    text: text,
                    createdAt: new Date(),
                    user: BOT,
                    quickReplies: {
                        type: 'radio',
                        keepIt: true,
                        values: lista
                    }
                }
                break

            case 'txt_img':
                text = result.queryResult.fulfillmentMessages[1].text.text[0];
                src = result.queryResult.fulfillmentMessages[2].image.imageUri;
                msg = {
                    _id: this.state.messages.length + 1,
                    text,
                    image: src,
                    createdAt: new Date(),
                    user: BOT
                }
                break;

            case 'txt_opc_img':
                text = result.queryResult.fulfillmentMessages[1].text.text[0];
                lista = []
                opciones = result.queryResult.fulfillmentMessages[2].quickReplies.quickReplies;
                for (let i = 0; i < opciones.length; i++) {
                    const newItem = {
                        title: opciones[i], value: opciones[i]
                    }
                    lista.unshift(newItem);
                }
                src = result.queryResult.fulfillmentMessages[3].image.imageUri;

                msg = {
                    _id: this.state.messages.length + 1,
                    text,
                    image: src,
                    createdAt: new Date(),
                    user: BOT,
                    quickReplies: {
                        type: 'radio',
                        keepIt: true,
                        values: lista
                    }
                }
                break;

            case 'txt_crd(img_btn(url))_crd':
                text = result.queryResult.fulfillmentMessages[1].text.text[0];

                msg = {
                    _id: this.state.messages.length + 1,
                    text: text,
                    createdAt: new Date(),
                    user: BOT
                }
                this.setState((previouseState) => ({
                    messages: GiftedChat.append(previouseState.messages, [msg]),
                }))

                msg = {
                    _id: this.state.messages.length + 1,
                    text: <Text onPress={abrirLink()}>{text}</Text>,
                    createdAt: new Date(),
                    user: BOT
                }
                break;
        }

        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, [msg]),
        }))
    }

    onSend(messages = []) {
        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, messages)
        }))

        let message = messages[0].text;

        Dialogflow_V2.requestQuery(
            message,
            (result) => this.handleGoogleResponse(result),
            (error) => console.log(error)
        )
    }

    onQuickReply(quickReply = []) {
        let msg = {
            _id: this.state.messages.length + 1,
            text: quickReply[0].value,
            createdAt: new Date(),
            user: { _id: 1 }
        }
        this.setState((previouseState) => ({
            messages: GiftedChat.append(previouseState.messages, [msg])
        }))

        let message = quickReply[0].value;

        Dialogflow_V2.requestQuery(
            message,
            (result) => this.handleGoogleResponse(result),
            (error) => console.log(error)
        )
    }

    renderBubble = props =>{
        if (props.currentMessage.isOptions){
            return (
                <View>
                    <Text>Hola</Text>
                </View>
            )
        }
    }


    render() {
        return (
            <ImageBackground
                source={require('../assets/images/fondogames.jpg')}
                resizeMode='cover'
                style={{ flex: 1, backgroundColor: colores.color2 }}
            >
                <View style={styles.chatbot}>
                    <View style={styles.header}>
                        <Image style={styles.image} source={require('../assets/images/chatBot.jpg')} resizeMode="contain" />
                        <Text style={styles.text1}>ESI BOT</Text>
                    </View>
                    <View style={{ width: '95%', height: '90%', alignSelf: 'center' }}>
                        <GiftedChat
                            disableComposer={true}
                            placeholder={'                        Seleccione una opción'}
                            messages={this.state.messages}
                            onSend={(message) => this.onSend(message)}
                            onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
                            user={{ _id: 1 }}
                        />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        marginTop: 5,
        borderRadius: 50,
        backgroundColor: colores.color1,
        width: '95%',
        alignSelf: 'center',
        height: 60,
        flexDirection: 'row'
    },
    chatbot: {
        marginTop: 25,
        width: '95%',
        height: '95%',
        alignSelf: 'center',
        backgroundColor: colores.color2,
        borderRadius: 20
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 10,
        marginTop: 4
    },
    text1: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: colores.color2
    }
})

export default ChatBot