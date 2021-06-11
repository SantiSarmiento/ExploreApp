import React from 'react';
import { ScrollView, StyleSheet, ImageBackground, Text, View } from 'react-native';
import ContentHome from '../Components/Home/ContentHome'
import { Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
const Home = (props) => {

    const city = [
        { id: 1, category: 'penises', name: 'For penises', url: 'http://tingarciadg.com/wp-content/uploads/2021/05/Screenshot-2021-05-30-192639.png' },
        { id: 2, category: 'vulva', name: 'For vulva', url: 'http://tingarciadg.com/wp-content/uploads/2021/05/Screenshot-2021-05-30-192710.png' },
        { id: 3, category: 'butt', name: 'For butts', url: 'http://tingarciadg.com/wp-content/uploads/2021/05/Screenshot-2021-05-30-192733.png' },
        { id: 4, category: 'lubricants', name: 'Lubricants', url: 'http://tingarciadg.com/wp-content/uploads/2021/06/lubri.png' },
        { id: 5, category: 'sexgame', name: 'Sex Game', url: 'http://tingarciadg.com/wp-content/uploads/2021/06/Diseno-sin-titulo-12.png' },
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

                        }}
                        onPress={() => props.navigation.navigate('Category', { id: item.category })}
                        titleStyle={styles.titleButtonCarousel}
                    />

                </ImageBackground>
                {/*  view*/}
            </View >
        )
    }
    return (
        <ScrollView>
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
                    <Text style={styles.titleHero}>Explore</Text>
                    <Text style={styles.titleSubTitle}>
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
            <ContentHome navigation={props.navigation} />
        </ScrollView>
    )
}
const styles = StyleSheet.create({

    titleHero: {
        textAlign: 'center',
        fontSize: 70,
        fontFamily: 'Montserrat_700Bold',
        color: 'white'
    },
    titleSubTitle: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Montserrat_700Bold',
        color: 'white'
    },
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
    titleButtonCarousel: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 26
    },


});

export default Home