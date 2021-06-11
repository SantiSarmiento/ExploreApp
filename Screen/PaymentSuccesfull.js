import React from "react"
import { StyleSheet, ScrollView, View, Text, Image } from "react-native"
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
const PaymenSuccessFull = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <Text style={{
                fontFamily: 'Montserrat_700Bold',
                fontSize: 30,
                textAlign: 'center',
                marginBottom: 15
            }}>
                Thank you very much for your purchase!
                </Text>
            <Text style={{
                fontFamily: 'Montserrat_700Bold',
                fontSize: 20,
                textAlign: 'center'
            }}>
                We send you the purchase made to your email
            </Text>
            <LottieView
                style={styles.paymentLottie}
                source={require("../assets/Animations/9912-payment-success.json")}
                autoPlay
                loop
            />

            <View >
                <LinearGradient style={styles.buttonAddCart}
                    colors={['#4158d0', '#c850c0', '#ffcc70']}
                    start={{ y: 0.4, x: 0.9 }}
                    end={{ y: 0.2, x: 0 }}
                >
                    <Button
                        type="clear"
                        title="Got back Home"
                        onPress={() => navigation.navigate("Home")}
                        buttonStyle={{ width: '100%', height: '100%' }}
                        titleStyle={{ fontFamily: 'Montserrat_700Bold', color: 'white' }}
                    />
                </LinearGradient>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textSubTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 20,
        marginBottom: 20
    },
    paymentLottie: {
        width: 400,
        height: 400
    },
    buttonAddCart: {
        width: 300,
        marginBottom: 15,
        marginTop: 15,
        height: 50,
    },


})


export default PaymenSuccessFull