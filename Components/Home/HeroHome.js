import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_700Bold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';


const HeroHome = () => {

    let [fontsLoaded] = useFonts({
        Montserrat_700Bold,
        Montserrat_400Regular
    })



    if (!fontsLoaded) {
        return <AppLoading />;
    }
    console.log(fontsLoaded)

    const city = [
        { id: 1, name: 'For penises', url: 'http://tingarciadg.com/wp-content/uploads/2021/05/Screenshot-2021-05-30-192639.png' },
        { id: 2, name: 'For vulva', url: 'http://tingarciadg.com/wp-content/uploads/2021/05/Screenshot-2021-05-30-192710.png' },
        { id: 3, name: 'For butts', url: 'http://tingarciadg.com/wp-content/uploads/2021/05/Screenshot-2021-05-30-192733.png' },
        { id: 4, name: 'Lubricants', url: 'http://tingarciadg.com/wp-content/uploads/2021/06/lubri.png' },
        { id: 5, name: 'Sex Game', url: 'http://tingarciadg.com/wp-content/uploads/2021/06/Diseno-sin-titulo-12.png' },
    ]
    const _renderItem = ({ item, index }) => {
        return (
            <View key={item.id} >
                <ImageBackground source={{ uri: item.url }} style={styles.image}>

                    <Button
                        title={item.name}
                        buttonStyle={{
                            width: 300,
                            backgroundColor: '#363636',
                            height: 80,
                            marginBottom: 20,
                            fontFamily: ' Montserrat_700Bold'
                        }}
                    />

                </ImageBackground>

            </View >
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Video
                    source={{ uri: 'http://baravdg.com/wp-content/uploads/2021/05/pexels-ron-lach-6756046-1.mp4' }}
                    rate={1.0}
                    isMuted={true}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={styles.video}
                />
                <View style={styles.heroText}>
                    <Text style={{
                        color: "white",
                        fontSize: 42,
                        fontWeight: "bold",
                        textAlign: 'center',
                        padding: 30,
                        fontFamily: 'Montserrat_700Bold'
                    }}>Explore</Text>
                    <Text style={styles.text}>
                        Dare to explore new horizons
                    </Text>
                </View>
            </View>
            <View style={styles.containerCarrusel}>
                <Carousel
                    ref={(c) => { _carousel = c; }}
                    data={city}
                    sliderWidth={425}
                    itemWidth={425}
                    renderItem={_renderItem}
                    layout={"stack"}
                    loop={true}
                    autoplay={true}
                />

            </View>
        </>
    )

}

const styles = StyleSheet.create({

    container: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    heroText: {
        position: "absolute",
        backgroundColor: "#000000a0",
        width: "100%",
        height: "100%",

    },

    image: {
        height: 580,
        width: "100%",
        resizeMode: "contain",
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    video: {
        height: 300,
        width: "100%",
    },
    title: {

    },
    text: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Montserrat_700Bold'
    },



});

export default HeroHome