import React from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';


const ContentHome = (props) => {
    return (
        <>
            <ImageBackground style={styles.image} source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-8.png' }}>
                <Text style={styles.titleCard}>SexToy</Text>
                <View>
                    <Button
                        title="For penises"
                        type="outline"
                        buttonStyle={styles.buttonCategory}
                        titleStyle={{ color: 'white', fontFamily: 'Montserrat_700Bold' }}
                        onPress={() => props.navigation.navigate('Category', { id: 'penises' })}
                    />
                    <Button
                        title="For vulva"
                        type="outline"
                        buttonStyle={styles.buttonCategory}
                        titleStyle={{ color: 'white', fontFamily: 'Montserrat_700Bold' }}
                        onPress={() => props.navigation.navigate('Category', { id: 'vulva' })}
                    />
                    <Button
                        title="For butts"
                        type="outline"
                        buttonStyle={styles.buttonCategory}
                        titleStyle={{ color: 'white', fontFamily: 'Montserrat_700Bold' }}
                        onPress={() => props.navigation.navigate('Category', { id: 'butt' })}
                    />
                </View>
            </ImageBackground>
            < ImageBackground style={styles.image} source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-9.png' }}>
                <Text style={styles.titleCard}>Accesories</Text>
                <View style={styles.containerButtons}>
                    <Button
                        title="Sexgame"
                        type="outline"
                        buttonStyle={styles.buttonCategory}
                        titleStyle={{ color: 'white', fontFamily: 'Montserrat_700Bold' }}
                        onPress={() => props.navigation.navigate('Category', { id: 'sexgame' })}
                    />
                    <Button
                        title="Clenears"
                        type="outline"
                        buttonStyle={styles.buttonCategory}
                        titleStyle={{ color: 'white', fontFamily: 'Montserrat_700Bold' }}
                        onPress={() => props.navigation.navigate('Category', { id: 'clenear' })}
                    />
                    <Button
                        title="Lubricants"
                        type="outline"
                        buttonStyle={styles.buttonCategory}
                        titleStyle={{ color: 'white', fontFamily: 'Montserrat_700Bold' }}
                        onPress={() => props.navigation.navigate('Category', { id: 'lubricants' })}
                    />
                </View>
            </ImageBackground>
            <View>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#e83e8c', '#6f42c1']}
                    style={styles.background}
                    locations={[0.2, 1]}
                    start={{ x: 0.1, y: 0.2 }}
                />
                <View style={styles.containerBlockIcon}>
                    <View style={styles.blockIconAndText}>
                        <Icon
                            raised
                            size={50}
                            type='font-awesome-5' name="truck"
                        />
                        <Text style={styles.titleBlockIcon}>Free Delivery</Text>
                        <Text style={styles.textBlockIcon}>On Orders Over £50</Text>
                    </View>
                    <View style={styles.blockIconAndText}>
                        <Icon
                            raised
                            size={50}
                            colors={[
                                { color: "gold", offset: "0", opacity: "1" },
                                { color: "red", offset: "1", opacity: "1" },
                            ]}
                            type='font-awesome-5' name="box-open"
                        />
                        <Text style={styles.titleBlockIcon}>14 Day Returns</Text>
                        <Text style={styles.textBlockIcon}>T&C's Apply</Text>
                    </View>
                </View>
                <View style={styles.containerBlockIcon}>
                    <View style={styles.blockIconAndText}>
                        <Icon
                            raised
                            size={50}
                            colors={[
                                { color: "gold", offset: "0", opacity: "1" },
                                { color: "red", offset: "1", opacity: "1" },
                            ]}
                            type='font-awesome-5' name="hand-holding-heart"
                        />
                        <Text style={styles.titleBlockIcon}>Hand Picked</Text>
                        <Text style={styles.textBlockIcon}>By Our Team</Text>
                    </View>
                    <View style={styles.blockIconAndText}>
                        <Icon
                            raised
                            size={50}
                            colors={[
                                { color: "gold", offset: "0", opacity: "1" },
                                { color: "red", offset: "1", opacity: "1" },
                            ]}
                            type='font-awesome-5' name="box"
                        />
                        <Text style={styles.titleBlockIcon}>Discreet</Text>
                        <Text style={styles.textBlockIcon} >Non-Identifiable Packaging</Text>
                    </View>
                </View>

            </View>
        </>
    )
}
const styles = StyleSheet.create({
    image: {
        height: 400,
        width: "100%",
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',

    },
    containerButtons: {
        padding: 20
    },
    buttonCategory: {
        marginBottom: 10,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 3,
        width: 250
    },
    titleCard: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Montserrat_700Bold',
        color: 'white'
    },
    titleContent: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Montserrat_700Bold',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        color: 'black'
    },
    containerBlockIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    blockIconAndText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
    },
    titleBlockIcon: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Montserrat_700Bold',
        color: 'white'
    },
    textBlockIcon: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        padding: 10
    }
})

export default ContentHome