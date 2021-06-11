import { StyleSheet, ScrollView, View, Text, Image } from "react-native"
import React, { useEffect, useState } from "react"
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
const CardProduct = (props) => {

    const { name, coverImage, price, brand, _id } = props.product
    return (
        <View style={styles.cardProductAllProduct}>
            <Text style={styles.tittleProductAllProduct}>{name}</Text>
            <Image key={_id} style={styles.coverImg} source={{ uri: coverImage }} />
            <View style={styles.infoContainer}>
                <Text style={styles.textPrice}>Є{price}</Text>
                <Text style={styles.textBrand}>
                    <Text style={styles.textBrandName}>Brand: </Text>
                    {brand}</Text>
            </View>
            <LinearGradient style={styles.buttonAddCart}
                colors={['#4158d0', '#c850c0', '#ffcc70']}
                start={{ y: 0.4, x: 0.9 }}
                end={{ y: 0.2, x: 0 }}
            >
                <Button
                    type="clear"
                    title="View product"
                    onPress={() => props.navigation.navigate('Product', { id: _id })}
                    buttonStyle={{ width: '100%', height: '100%' }}
                    titleStyle={{ fontFamily: 'Montserrat_700Bold', color: 'white' }}
                />
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonAddCart: {
        marginTop: 10,
        marginBottom: 10,
        height: 50,
        borderRadius: 20
    },
    cardProductAllProduct: {
        backgroundColor: 'white',
        margin: 30,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
        width: '80%'
    },
    tittleProductAllProduct: {
        fontFamily: 'DancingScript_400Regular',
        fontSize: 35
    },
    cardContainer: {
        alignItems: "center"
    },
    coverImg: {
        width: 280,
        height: 280,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    textBrandName: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 26,
    },
    textPrice: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 40,
    },
    textBrand: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 22,
        marginTop: 10,
        letterSpacing: 2,
        marginBottom: 20,
    }
})

export default CardProduct