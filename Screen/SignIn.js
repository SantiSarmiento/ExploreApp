import React from 'react';
import { connect } from "react-redux"
import userActions from "../redux/Action/userActions"
import Toast from 'react-native-toast-message';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as Google from "expo-google-app-auth"
import * as Facebook from 'expo-facebook';
import { LinearGradient } from 'expo-linear-gradient';
const SignIn = (props) => {

    async function logInFacebook() {

        try {
            await Facebook.initializeAsync({
                appId: process.env.REACT_APP_FACEBOOK_ID,
            });
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,email,last_name,picture&access_token=${token}`);
                const dataUser = await response.json()
                console.log("soy success")
                props.createAcount({
                    user: `${dataUser.first_name}${dataUser.last_name}`,
                    email: dataUser.email,
                    password: process.env.REACT_APP_PASS,
                    urlImg: dataUser.picture.data.url,
                    googleFlag: true
                })
                    .then(data => data
                        ? props.navigation.navigate("Home")
                        : Toast.show({
                            text1: 'Error try to login again',
                            type: 'error',
                            position: 'bottom',
                        }))

                Toast.show({
                    text1: 'Welcome👋',
                    position: 'bottom',

                });

            } else {
                Toast.show({
                    text1: 'Error try to login again',
                    type: 'error',
                    position: 'bottom',
                })
            }
        } catch ({ message }) {
            Toast.show({
                text1: message,
                type: 'error',
                position: 'bottom',
            })
        }
    }


    const SignUpWhitGoogle = async () => {

        const { type, user } = await Google.logInAsync({
            androidClientId: process.env.REACT_APP_GOOGLE_ID
        })
        if (type === "success") {
            props.signInUser({ email: user.email, password: process.env.REACT_APP_PASS })
                .then(data => data
                    ? props.navigation.navigate("Home")
                    : Toast.show({
                        text1: 'Error try to login again',
                        type: 'error',
                        position: 'bottom',
                    }))
        }
        else {
            Toast.show({
                text1: message,
                type: 'error',
                position: 'bottom',
            })
        }
    }


    return (
        <ImageBackground resizeMode='stretch' style={styles.containerForm} source={{ uri: "http://tingarciadg.com/wp-content/uploads/2021/05/pexels-sameera-ganegoda-2234783-scaled.jpg" }}>

            <View style={styles.containerLogo}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Image resizeMode='contain' style={styles.logo} source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-4.png' }} />
                </View>

            </View>

            <View style={styles.containerBtns}>
                <View>
                    <Text
                        style={{
                            color: 'black',
                            fontFamily: 'Montserrat_700Bold',
                            fontSize: 25,
                        }}
                    >
                        Welcome!
                    </Text>
                </View>


                <LinearGradient style={styles.buttonAddCart}
                    colors={['#4158d0', '#c850c0', '#ffcc70']}
                    start={{ y: 0.4, x: 0.9 }}
                    end={{ y: 0.2, x: 0 }}
                >
                    <Button
                        type="clear"
                        title="Sign in with explore"
                        onPress={() => { props.navigation.navigate('FormSignIn') }}
                        buttonStyle={{ width: '100%', height: '100%' }}
                        titleStyle={{ fontFamily: 'Montserrat_700Bold', color: 'white' }}
                    />
                </LinearGradient>

                <TouchableOpacity onPress={() => SignUpWhitGoogle()} style={styles.FacebookStyle} activeOpacity={0.5}>
                    <Image source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/g-logo.png' }} style={styles.ImageIconStyle}
                    />
                    <View style={styles.SeparatorLine} />

                    <Text style={styles.TextStyle}> Sign in with Google </Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => logInFacebook()} style={styles.buttonFacebook} activeOpacity={0.5}>
                    <Icon style={{ marginRight: 10, marginRight: 10 }} name='facebook' type='font-awesome-5' size={35} color='white' />
                    <Text style={{ color: 'white', fontFamily: 'Montserrat_700Bold' }}> Sign in with Facebook </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { props.navigation.navigate('Sign Up') }} style={styles.buttonSignIn} activeOpacity={0.5}>
                    <Text style={{ color: 'black', fontFamily: 'Montserrat_700Bold', fontSize: 20 }}> Sign up </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground >
    )
}
const styles = StyleSheet.create({
    containerLogo: {
        backgroundColor: 'white',
        height: 200,
        width: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    logo: {
        width: 150,
        height: 150,


    },
    containerForm: {
        width: "100%",
        height: "100%",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerBtns: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: "100%",
        height: "60%",
        padding: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    buttonExplore: {
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: 'red',
    },
    buttonFacebook: {
        backgroundColor: '#0D88F0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        borderRadius: 5,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        width: 300,
        elevation: 3,
    },
    buttonSignIn: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',

        borderColor: '#fff',
        height: 50,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        width: 300,
        elevation: 3,
        alignItems: 'center',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    iconGoogle: {
        fontSize: 20
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },

    FacebookStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        borderRadius: 5,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 4,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        width: 300,
        marginBottom: 15,
        marginTop: 15

    },

    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',

    },
    TextStyle: {
        color: "gray",
        marginBottom: 4,
        marginRight: 20,
        fontFamily: 'Montserrat_700Bold'
    },

    SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40

    },
    buttonAddCart: {
        width: 300,
        marginBottom: 15,
        marginTop: 15,
        height: 50,
    },

})

const mapDispatchToProps = {
    signInUser: userActions.signInUser
}


export default connect(null, mapDispatchToProps)(SignIn)