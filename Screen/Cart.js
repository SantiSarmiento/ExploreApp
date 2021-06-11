import React, { useEffect, useState } from "react"
import { StyleSheet, ScrollView, View } from "react-native"
import { Text, Divider, Button } from "react-native-elements"
import CardCart from "../Components/Cart/CardCart"



const Cart = ({ navigation }) => {
    const [subtotal, setSubtotal] = useState()

    useEffect(() => {
        setSubtotal(products.reduce((a, b) => (a.price * a.units) + (b.price * b.units)))
    }, [products])


    return <ScrollView contentContainerStyle={styles.mainContainer} >
        {products.length
            ? products.map(product => <CardCart key={product._id} product={product} />)
            : null
        }

        <View style={{ marginTop: "5%" }}>
            <Text style={{ marginLeft: "4%", marginBottom: "2.5%" }}>Price Details</Text>

            <View style={styles.totalsContainer}>

                <View style={styles.containers}>
                    <Text style={styles.textGrey}>Sub Total</Text>
                    <Text style={styles.textGrey}>€{subtotal}</Text>
                </View>
                <View style={styles.containers}>
                    <Text style={styles.textGrey}>Discount</Text>
                    <Text style={styles.textGrey}>€65</Text>
                </View>
                <View style={styles.containers}>
                    <Text style={styles.textGrey}>Estimated Tax</Text>
                    <Text style={styles.textGrey}>€55</Text>
                </View>
                <View style={styles.containers}>
                    <Text style={styles.textGrey}>Delivery</Text>
                    <Text style={styles.textGrey}>€22</Text>
                </View>

                <Divider />

                <View style={styles.totalContainer}>
                    <Text style={styles.textbold} >Total Payable</Text>
                    <Text style={styles.textbold} >€555</Text>
                </View>

            </View>

            <View style={styles.buttonsContainer}>
                <Button buttonStyle={styles.buttons} onPress={() => navigation.goBack()} type="outline" title="cancel" />
                <Button buttonStyle={styles.buttons} onPress={() => navigate('Profile', { props: "props" })} title="next" />
            </View>

        </View>

    </ScrollView>
}

export default Cart

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
})