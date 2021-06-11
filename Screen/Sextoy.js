import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import productsActions from "../redux/Action/productsActions"
import { StyleSheet, ScrollView, View, Text, Image, } from "react-native"
import CardProduct from '../Components/products/CardProduct'
import { SearchBar, Divider } from 'react-native-elements';
import LottieView from 'lottie-react-native';
const Sextoy = (props) => {
    const { getProducts, filtered, searchAction } = props

    const [sexToyPennis, setSexToyPennis] = useState([])
    const [sexToyVulva, setSexToyVulva] = useState([])
    const [sexToyButts, setSexToyButts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!filtered.length && !search) { getProducts() }
        else { setLoading(false) }
        filterProducts()
    }, [filtered])

    const filterProducts = () => {

        let penises = []
        let vulva = []
        let butts = []

        if (filtered.length !== 0) {
            filtered.map(product => {
                const categories = product.categories
                categories.map(category => {
                    if (category.name === 'penises') {
                        penises.push(product)
                    } else if (category.name === 'vulva') {
                        vulva.push(product)
                    } else if (category.name === 'butt') {
                        butts.push(product)
                    }
                    return null
                })
                return null
            })
        }

        setSexToyPennis(penises)
        setSexToyVulva(vulva)
        setSexToyButts(butts)
    }


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
            <SearchBar
                value={search}
                placeholder="Search product..."
                onChangeText={v => { setSearch(v); searchAction(v) }}
                platform='ios'
                containerStyle={styles.input}
            />

            {   filtered.length && search.length

                ? filtered.map(product => <CardProduct navigation={props.navigation} key={product._id} product={product} />)

                : search.length && !filtered.length
                    ? <View style={styles.containerNotSearch}>
                        <Text style={styles.textNoresult}>
                            No results found for your search
                        </Text>
                        <LottieView
                            style={styles.cartEmpty}
                            source={require("../assets/Animations/6926-sad-package.json")}
                            autoPlay
                            loop
                        />
                    </View>

                    : <>
                        <View>
                            <Text style={styles.titleCategories}>Sex Toys for Penises</Text>
                            <Divider />
                            <View style={styles.cardContainer}>
                                {sexToyPennis.length
                                    ? sexToyPennis.map(product => <CardProduct navigation={props.navigation} key={product._id} product={product} />)
                                    : null
                                }
                            </View>
                        </View>

                        <View>
                            <Text style={styles.titleCategories}>Sex Toys for Vulvas</Text>
                            <Divider />
                            <View style={styles.cardContainer}>
                                {sexToyVulva.length
                                    ? sexToyVulva.map(product => <CardProduct navigation={props.navigation} key={product._id} product={product} />)
                                    : null
                                }
                            </View>
                        </View>

                        <View>
                            <Text style={styles.titleCategories}>Sex Toys for Butts</Text>
                            <Divider />
                            <View style={styles.cardContainer}>
                                {sexToyButts.length
                                    ? sexToyButts.map(product => <CardProduct navigation={props.navigation} key={product._id} product={product} />)
                                    : null
                                }
                            </View>
                        </View>
                    </>
            }
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        filtered: state.productsReducer.filtered
    }
}

const mapDispatchToProps = {
    getProducts: productsActions.fetchAllProducts,
    searchAction: productsActions.searchAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Sextoy)



const styles = StyleSheet.create({

    cardContainer: {
        alignItems: "center",
    },
    titleCategories: {
        fontSize: 35,
        textAlign: "center",
        fontFamily: 'Montserrat_400Regular',
    },
    containerNotSearch: {
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