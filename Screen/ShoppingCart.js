import { ScrollView, View, Text, Image, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, Divider } from 'react-native-elements'
import { connect } from "react-redux"
import CardCart from "../Components/Cart/CardCart"
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

const ShoppingCart = (props) => {

    const cart = props.articles ? props.articles : []
    let prices = cart.map(article => article.price * article.units)
    let total = prices.length === 0 ? 0 : prices.reduce((a, b) => a + b)

    return (
        <ScrollView style={styles.mainContainer}  >
            <View>
                {
                    cart.length === 0
                        ? <View style={styles.containerLottie}>
                            <LottieView
                                style={styles.cartEmpty}
                                source={require("../assets/Animations/42176-empty-cart.json")}
                                autoPlay
                                loop
                            />
                        </View>
                        : cart.map(product => <CardCart key={product._id} product={product} />)
                }
            </View>
            <View style={{ marginTop: "5%" }}>
                <Text style={{ marginLeft: "4%", marginBottom: "2.5%" }}>Price Details</Text>

                <View style={styles.totalsContainer}>

                    <View style={styles.containers}>
                        <Text style={styles.textGrey}>Sub Total</Text>
                        <Text style={styles.textGrey}>€{total}</Text>
                    </View>
                    <Divider />
                    <View style={styles.totalContainer}>
                        <Text style={styles.textbold} >Total Payable</Text>
                        <Text style={styles.textbold} >{total}</Text>
                    </View>

                </View>

                <View style={styles.buttonsContainer}>
                    <Button buttonStyle={styles.buttons} onPress={() => props.navigation.goBack()} type="outline" title="cancel" />
                    <Button buttonStyle={styles.buttons} onPress={() =>{
                        cart.length 
                        ? props.navigation.navigate('Checkout', { cart: cart, total })
                        : Toast.show({
                            text1: 'Your cart is empty',
                            type: 'error',
                            position: 'bottom',
                        })
                    }} title="next" />
                </View>

            </View>
        </ScrollView>

    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        articles: state.cart.articles.filter(article => article.status === true)
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        margin: "4%",
        paddingBottom: "10%"
    },
    totalsContainer: {
        borderColor: "#CDCDCD",
        borderWidth: 1.5,
        borderRadius: 7
    },
    containers: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "3.5%"
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "4%",
        marginBottom: "4%",
        marginLeft: "10%",
        marginRight: "10%"
    },
    textbold: {
        fontWeight: "bold"
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttons: {
        marginTop: "4%",
        marginBottom: "2%",
        width: "87%",
        borderRadius: 7
    },
    textGrey: {
        color: "#5B5A5A"
    },
    cartEmpty: {
        width: 300,
        height: 300,

    },
    containerLottie: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps)(ShoppingCart)
