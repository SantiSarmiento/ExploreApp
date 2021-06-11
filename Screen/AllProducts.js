import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import productsActions from "../redux/Action/productsActions"
import { StyleSheet, ScrollView, View, Text, Image } from "react-native"
import CardProduct from '../Components/products/CardProduct'
import { SearchBar } from 'react-native-elements';
import LottieView from 'lottie-react-native';

const AllProducts = (props) => {
    const { fetchAllProducts, filtered, searchAction } = props
    const [busqueda, setBusqueda] = useState("")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchAllProducts()
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <View style={styles.containerLottie}>
                <LottieView
                    style={styles.cartEmpty}
                    source={require("../assets/Animations/57882-mouth.json")}
                    autoPlay
                    loop
                />
            </View>
        )
    }
    return (

        <ScrollView >
            <View style={styles.containerAllProduct}>
                <SearchBar
                    value={busqueda}
                    placeholder="Search product..."
                    onChangeText={v => { setBusqueda(v); searchAction(v) }}
                    platform='ios'
                    containerStyle={styles.input}
                />

                {filtered.length
                    ? filtered.map(product => <CardProduct navigation={props.navigation} key={product._id} product={product} />)
                    : <View style={styles.containerNotSearch}>
                        <Text style={styles.textNoresult}>We don't have any products whith letter "{busqueda}" </Text>
                        <LottieView
                            style={styles.cartEmpty}
                            source={require("../assets/Animations/6926-sad-package.json")}
                            autoPlay
                            loop
                        />
                    </View>
                }
            </View>

        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        filtered: state.productsReducer.filtered
    }
}

const mapDispatchToProps = {
    fetchAllProducts: productsActions.fetchAllProducts,
    searchAction: productsActions.searchAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)


const styles = StyleSheet.create({
    containerAllProduct: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        alignItems: "center",
    }, containerNotSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    cartEmpty: {
        width: 280,
        height: 280,

    },
    textNoresult: {
        fontSize: 30,
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center'

    },
    cartEmpty: {
        width: 400,
        height: 400,

    },
    containerLottie: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }


})
