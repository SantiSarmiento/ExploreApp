import React, { useEffect, useState } from "react"
import { StyleSheet, ScrollView, View } from "react-native"
import { Text, Divider, Image } from "react-native-elements"
import { Button } from "react-native-elements/dist/buttons/Button"
import { connect } from "react-redux"
import cartActions from "../../redux/Action/cartActions"

const CardCart = (props) => {

    const { removeArticle, buyArticle, subtract, globalAccountant, product } = props
    const [accountant, setAccountant] = useState(product.units)
    const addAndRemove = (action) => {
        if (action === "Add") {
            if (accountant === product.stock) {
                alert("llegaste al stock pa")
            } else {
                setAccountant(accountant + 1)
                buyArticle(product)
            }
        } else {
            if (accountant < 2) {
                removeArticle(product)
            } else {
                setAccountant(accountant - 1)
                subtract(product)
            }
        }
    }

    const remove = () => {
        removeArticle(product)
    }

    return <View key={product._id} style={styles.card}>
        <Text style={{ color: "#454242", margin: "2%" }}>{product.name}</Text>
        <Divider />

        <View style={styles.infoContainer}>

            <View style={styles.firstContainer}>
                <Image style={styles.productImg} source={{ uri: product.coverImage }} />
            </View>

            <View style={styles.secondContainer}>

                <Text style={styles.description}>{product.description.slice(0, 15)}...</Text>
                <Text style={styles.price} >EUR €{product.price}</Text>
                <View style={styles.envioContainer}>
                    <Text>{product.ship ? "Ship" : null}</Text>
                    <View style={styles.buttonContainer}>
                        <Button onPress={() => { addAndRemove("remove") }} buttonStyle={styles.lessButton} titleStyle={styles.lessTittle} title="-" />
                        <Text>{accountant}</Text>
                        <Button onPress={() => { addAndRemove("Add") }} buttonStyle={styles.plusButton} titleStyle={styles.plusTittle} title="+" />

                    </View>
                </View>
            </View>

        </View>
        <View style={styles.tallaContainer}>
            <Text style={{ color: "#454242" }}></Text>
            <View style={{ flexDirection: "row" }}>
                <Button onPress={remove} titleStyle={styles.titleStyle} buttonStyle={styles.buttonStyle} type="outline" title="Remove" />
            </View>
        </View>

    </View>

}

const styles = StyleSheet.create({
    card: {
        marginTop: "1%",
        marginBottom: "1%",
        borderColor: "#CDCDCD",
        borderWidth: 1,
        borderRadius: 10,
        padding: "3%"
    },
    productImg: {
        height: 115,
        width: 115
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    firstContainer: {
        flex: 1
    },
    secondContainer: {
        flex: 2,
        justifyContent: "space-around",
        marginTop: "3%"
    },
    envioContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: "1%"
    },
    lessTittle: {
        color: "#5B5A5A"
    },
    lessButton: {
        marginRight: 9,
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#CDCDCD"
    },
    plusTittle: {
        color: "#5B5A5A"
    },
    plusButton: {
        marginLeft: 9,
        borderWidth: 1,
        backgroundColor: "#CDCDCD",
        width: 35,
        height: 35,
        borderRadius: 50,
        borderColor: "#CDCDCD"
    },
    tallaContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    titleStyle: {
        color: "#5B5A5A"
    },
    buttonStyle: {
        margin: 5,
        height: 45,
        borderColor: "#CDCDCD",
        borderWidth: 1
    },
    price: {
        fontWeight: "bold",
        fontSize: 15
    },
    description: {
        color: "#5B5A5A"
    },
})
const mapStateToProps = state => {
    return {
        globalAccountant: state.cart.accountant
    }
}

const mapDispatchToProps = {
    removeArticle: cartActions.removeArticle,
    buyArticle: cartActions.buyArticle,
    subtract: cartActions.subtract,
}

export default connect(mapStateToProps, mapDispatchToProps)(CardCart)