import { ImageBackground, Image, TouchableOpacity, StyleSheet, View, Text, FlatList, Button, Linking } from 'react-native';
import { cards } from '../components/resourcesCards';
import { colores } from '../colores';

const ResourcessScreen = ({ navigation }) => {

    const AbrirVideo = (url) => {
        Linking.openURL(url);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/background.png')} resizeMode='cover' style={styles.image}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.textheader}>Material para aprender más</Text>
                    </View>
                    <View style={{ height: 680 }}>
                        <FlatList
                            style={{ alignSelf: 'center' }}
                            data={cards}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <View style={styles.subcard1}>
                                        <Image style={styles.imageLogo} source={item.adress} resizeMode='contain' />
                                    </View>
                                    <View style={styles.subcard2}>
                                        <Text style={styles.text1}>{item.type}</Text>
                                        <Text style={styles.text2}>{item.title}</Text>
                                        <Text style={styles.text3}>{item.autor}</Text>
                                        <Text style={styles.text4}>{item.theme}</Text>
                                        <TouchableOpacity style={styles.button}>
                                            <Text style={styles.textButton} onPress={() => AbrirVideo(item.url)}>Abrir</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 25,
        marginBottom: 10,
        width: 380,
        height: 100,
        alignSelf: 'center',
        backgroundColor: colores.color4,
        borderRadius: 45
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageLogo: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    card: {
        flexDirection: 'row',
        width: 380,
        height: 200,
        marginTop: 25,
    },
    subcard1: {
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        width: 100,
        height: 200,
        backgroundColor: colores.color4,
        borderColor: colores.color3,
        borderWidth: 3
    },
    subcard2: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colores.color2,
        width: 280,
        height: 200,
        borderLeftWidth: 0,
        borderColor: colores.color3,
        borderWidth: 3
    },
    button: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 28,
        backgroundColor: colores.color4,
        borderRadius: 15
    },
    textButton: {
        color: colores.color2,
        fontSize: 11,
        fontWeight: 'bold'
    },
    textheader: {
        fontSize: 40,
        marginTop: -3,
        textAlign: 'center',
        alignSelf: 'center',
        color: colores.color2,
        fontWeight: 'bold'
    },
    text1: {
        fontSize: 11,
        marginTop: 8,
        marginLeft: 10,
        color: colores.color4,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 15,
        marginTop: 8,
        marginHorizontal: 10,
        color: colores.color4,
        fontWeight: 'bold'
    },
    text3: {
        fontSize: 11,
        marginTop: 5,
        marginLeft: 10,
        color: colores.color6,
        textDecorationLine: 'underline'
    },
    text4: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
        color: colores.color4
    },

})
export default ResourcessScreen;