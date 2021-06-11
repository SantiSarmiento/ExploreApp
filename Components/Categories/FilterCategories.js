import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import productsActions from "../../redux/Action/productsActions"
import { ScrollView, StyleSheet, ImageBackground, Text, View } from 'react-native';
import { SearchBar, Divider } from 'react-native-elements';
import LottieView from 'lottie-react-native'
import CardProduct from '../products/CardProduct'
const FilterCategories = (props) => {

    console.log(props.navigation)

    const { getProducts, filtered, searchAction } = props

    const [productCategory, setProductCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!filtered.length && !search) { getProducts() }
        else { setLoading(false) }
        filterProducts()
    }, [filtered])

    const filterProducts = () => {

        let productsCategories = []

        if (filtered.length !== 0) {
            filtered.map(product => {
                const categories = product.categories
                categories.map(category => {
                    if (category.name === props.route.params.id) {
                        productsCategories.push(product)
                    }
                    return null
                })
                return null
            })
        }

        setProductCategory(productsCategories)
    }

    if (loading) {
        return (
            <View style={styles.containerLottie}>
                <LottieView
                    style={styles.cartEmpty}
                    source={require("../../assets/Animations/57882-mouth.json")}
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
                    value={search}
                    placeholder="Search product..."
                    onChangeText={v => { setSearch(v); searchAction(v) }}
                    platform='ios'
                    containerStyle={styles.input}
                />


                {
                    filtered.length && search.length

                        ? filtered.map(product => <CardProduct navigation={props.navigation} key={product._id} product={product} />)

                        : search.length && !filtered.length
                            ? <View style={styles.containerNotSearch}>
                                <Text style={styles.textNoresult}>
                                    No results found for your search
                                 </Text>
                                <LottieView
                                    style={styles.cartEmpty}
                                    source={require("../../assets/Animations/6926-sad-package.json")}
                                    autoPlay
                                    loop
                                />
                            </View>

                            :
                            <View>
                                <View style={styles.cardContainer}>
                                    {productCategory.length
                                        ? productCategory.map(product => <CardProduct navigation={props.navigation} key={product._id} product={product} />)
                                        : null
                                    }
                                </View>
                            </View>

                }
            </View>
        </ScrollView>
    )
}
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

const mapStateToProps = state => {
    return {
        filtered: state.productsReducer.filtered
    }
}

const mapDispatchToProps = {
    getProducts: productsActions.fetchAllProducts,
    searchAction: productsActions.searchAction
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategories)