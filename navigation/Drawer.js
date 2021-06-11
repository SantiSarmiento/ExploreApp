import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { HomeStack, SexToyStack, SignInStack, SignUpStack, AccesoriesStack, AllproductsStack } from './Stack'
import { ShoppingCartStack } from "./Stack"
import { connect } from 'react-redux';
import userActions from '../redux/Action/userActions'
import { ImageBackground, StyleSheet, Text, View, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartActions from '../redux/Action/cartActions';
const drawer = createDrawerNavigator()
const Drawer = (props) => {

    const { usuarioStatus, SignOut } = props

    useEffect(() => {
        loginLocalStoreUser()
    }, [])

    const loginLocalStoreUser = async () => {

        if (!props.usuarioStatus && AsyncStorage.getItem('token')) {
            const tokenAsyncStorage = await AsyncStorage.getItem('token')
            if (tokenAsyncStorage) {
                const infoUser = await AsyncStorage.getItem('userLogged')
                const infoUserConvert = JSON.parse(infoUser)
                const userLoggedInfo = {
                    token: tokenAsyncStorage,
                    ...infoUserConvert
                }
                props.relogin(userLoggedInfo)
                return null
            }
        }
    }
    useEffect(() => {
        productsLocalStorage()
    }, [])

    const productsLocalStorage = async () => {

        var cart = await AsyncStorage.getItem("cart")
        var number = await AsyncStorage.getItem("num")


        if (cart) {
            const response = JSON.parse(cart)
            props.localStorage(response)
        }

        if (number) {
            const response = JSON.parse(number)
            props.localStorageNum(response)
        }

    }

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                {
                    usuarioStatus
                        ? <ImageBackground resizeMode='cover' style={styles.containerUserFoto} source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/blurred-pop-abstract-background-with-vivid-primary-colors-min-scaled.jpg' }}>
                            <View style={styles.containerPhotoAndText}>
                                <Image style={{ width: 80, height: 80, borderRadius: 100 }} source={{ uri: usuarioStatus.img }} />
                                <Text style={styles.nameUser}>{usuarioStatus.name}</Text>

                            </View>
                        </ImageBackground>
                        : <View style={styles.containerLogo}>
                            <Image style={{ width: "60%", height: 80, borderRadius: 100 }} source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/05/Diseno-sin-titulo-4.png' }} />
                        </View>
                }
                <DrawerItemList {...props} />
                { usuarioStatus &&
                    <DrawerItem
                        label="Sign Out"
                        labelStyle={{
                            fontSize: 20,
                            fontFamily: 'Montserrat_400Regular'
                        }}
                        onPress={() => SignOut()}
                        icon={() => {
                            return (
                                <Image style={{ width: 30, height: 30 }} source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/sign-out.png' }} />
                            );
                        }}
                    />

                }
            </DrawerContentScrollView>
        );
    }


    return (

        <drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerStyle={{
                backgroundColor: 'white',
                width: "85%",
                color: 'red'
            }}
            drawerContentOptions={{
                activeTintColor: 'white',
                activeBackgroundColor: '#EBA0FA',
                inactiveTintColor: 'blue',
                inactiveBackgroundColor: 'white',
                labelStyle: {
                    marginLeft: 5,
                    fontSize: 20,
                    fontFamily: 'Montserrat_400Regular'
                }
            }}

        >
            <drawer.Screen
                name="Home"
                component={HomeStack}
                options={{
                    title: 'Home',
                    drawerIcon: () => (

                        <Image
                            style={{ width: 30, height: 30 }}
                            source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/home.png' }}
                        />
                    )
                }}
            />
            {
                !usuarioStatus &&
                <>
                    <drawer.Screen
                        name="Sign In"
                        component={SignInStack}
                        options={{
                            title: 'Sign In',
                            drawerIcon: () => (
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/sign-in-1.png' }}
                                />

                            ),
                        }}
                    />
                    <drawer.Screen name="Sign Up" component={SignUpStack}
                        options={{
                            title: 'Sign Up',
                            drawerIcon: () => (
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/add-user.png' }}
                                />

                            )
                        }}
                    />
                </>
            }
            <drawer.Screen
                name="SexToy"
                component={SexToyStack}
                options={{
                    title: 'Sex Toys',
                    drawerIcon: () => (
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/eee.png' }}
                        />

                    )
                }}
            />
            <drawer.Screen
                name="Accesories"
                component={AccesoriesStack}
                options={{
                    title: 'Accesories',
                    drawerIcon: () => (
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/esposas.png' }}
                        />

                    )
                }}

            />
            <drawer.Screen
                name="All products"
                component={AllproductsStack}
                options={{
                    title: 'All products',
                    drawerIcon: () => (
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/shopping-bag.png' }}
                        />

                    ),
                    labelStyle: {
                        color: 'red'
                    }
                }}

            />
            < drawer.Screen
                name="ShoppingCart"
                component={ShoppingCartStack}
                options={{
                    title: 'Shop Cart',
                    drawerIcon: () => (
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/esposas.png' }}
                        />

                    )
                }}
            />
        </drawer.Navigator>
    )
}
const styles = StyleSheet.create({

    usurPic: {
        height: 40,
        width: 40,
        borderRadius: 100
    },
    nameUser: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Montserrat_700Bold'
    },
    containerUserFoto: {
        alignItems: 'flex-start',
        width: "100%",
        height: 150,
    },
    containerPhotoAndText: {
        marginLeft: 30,
        marginTop: 30
    },
    containerLogo: {
        justifyContent: 'center',
        alignItems: 'center'
    }


});

const mapStateToProps = state => {
    return {
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {
    SignOut: userActions.SignOut,
    localStorage: cartActions.localStorage,
    localStorageNum: cartActions.localStorageNum,
    relogin: userActions.relogin
}


export default connect(mapStateToProps, mapDispatchToProps)(Drawer)

