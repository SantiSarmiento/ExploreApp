import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import cartActions from "../../redux/Action/cartActions"
import { Button } from 'react-native-elements'
import { ScrollView, View, Text, Image, StyleSheet, ImageBackground } from "react-native"

const ArticleCart = (props) => {
    const { article, removeArticle, buyArticle, subtract, globalAccountant } = props
    const [accountant, setAccountant] = useState(article.units)

    const remove = () => {
        removeArticle(article)
    }

    const addAndRemove = (action) => {
        if (action === "Add") {
            if (accountant === article.stock) {
                alert("llegaste al stock pa")
            } else {
                setAccountant(accountant + 1)
                buyArticle(article)
            }
        } else {
            if (accountant < 2) {
                removeArticle(article)
            } else {
                setAccountant(accountant - 1)
                subtract(article)
            }
        }
    }

    return (

        <>
            <View>
                <Text>{article.name}</Text>
                <ImageBackground source={{ uri: article.coverImage }} style={styles.image}>
                </ImageBackground>
                <View>
                    <Button onPress={() => { addAndRemove("Add") }}>+</Button>
                    <Text>{accountant}</Text>
                    <Button onPress={() => { addAndRemove("remove") }}>-</Button>
                </View>
                <View>
                    <Text>Є{article.price * accountant}</Text>
                </View>
                <Button onPress={remove}>DELETE PA</Button>
            </View>
        </>

    )
}

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

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
        backgroundColor: 'gray',
        padding: 20,
        resizeMode: 'contain'
    },


})


export default connect(mapStateToProps, mapDispatchToProps)(ArticleCart)