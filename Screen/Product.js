import { ScrollView, View, Text, Image, StyleSheet, ImageBackground } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, Icon } from 'react-native-elements'
import { connect } from "react-redux"
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import Comments from "../Components/products/Comments";
import cartActions from "../redux/Action/cartActions"
import Toast from 'react-native-toast-message';
import commentsActions from '../redux/Action/commentsActions'
import { LinearGradient } from 'expo-linear-gradient';

const Product = (props) => {
    const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);
    const imgCard = [
        "http://tingarciadg.com/wp-content/uploads/2021/06/011-visa.png",
        "http://tingarciadg.com/wp-content/uploads/2021/06/009-discover.png",
        "http://tingarciadg.com/wp-content/uploads/2021/06/006-citi.png",
        "http://tingarciadg.com/wp-content/uploads/2021/06/026-paypal.png",
        "http://tingarciadg.com/wp-content/uploads/2021/06/024-maestro.png"
    ]
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [renderComment, setRenderComment] = useState([])
    useEffect(() => {
        getArticle()
        fetchComments()
    }, [])
    const _renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View key={item.id} style={styles.slide}>
                <ParallaxImage
                    source={{ uri: item.thumbnail }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.1}
                    {...parallaxProps}
                />
                <LinearGradient style={{ width: '100%', height: 400 }}
                    colors={['#a9c9ff', '#ffbbec', '#a9c9ff']}
                    start={{ y: 0.4, x: 0.9 }}
                    end={{ y: 0.2, x: 0 }}
                >
                    <ImageBackground source={{ uri: item.photo }} style={styles.image}>
                    </ImageBackground>
                </LinearGradient>


            </View >
        )
    }

    /* Get Product */
    const getArticle = async () => {
        let response = await props.allProducts()
        let item = response.find(article => article._id === props.route.params.id)
        setArticle(item)
        setLoading(false)
    }

    const fetchComments = async () => {
        let response = await props.products()
        let item = response.find(article => article._id === props.route.params.id)
        setRenderComment(item.comments)
    }



    /* Carrito */
    const buy = () => {
        if (article.units === article.stock) {
            Toast.show({
                text1: 'No more stock available',
                type: 'error',
                position: 'bottom',
            })
        } else {
            props.buyArticle(article)
            Toast.show({
                text1: 'Add new product',
                position: 'bottom',
            })
        }
    }
    /* console.log(article) */

    if (loading) {
        return null
    }

    return (
        <ScrollView style={styles.containerProduct}>
            <Text style={styles.productName}>{article.name}</Text>
            <View style={styles.carousel}>
                <Carousel
                    ref={(c) => { _carousel = c; }}
                    data={article.productsImages}
                    sliderWidth={425}
                    itemWidth={425}
                    renderItem={_renderItem}
                    layout={"tinder"}
                    onSnapToItem={(index) => setSlider1ActiveSlide(index)}
                    tappableDots={true}
                    autoplay={true}
                    hasParallaxImages={true}
                    layoutCardOffset={38}
                />
                <Pagination
                    dotsLength={article.productsImages.length}
                    containerStyle={styles.paginationContainer}
                    inactiveDotScale={20}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'black'
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    activeDotIndex={slider1ActiveSlide}
                />
            </View>
            <View style={styles.containerPrecieAndStock}>
                <View>
                    <Text style={styles.textPrice}>Є{article.price}</Text>
                </View>
                <View style={styles.containerStock}>
                    <Text style={styles.textStock}>Stock:</Text>
                    <Text style={styles.textStockPrice}>{article.stock}</Text>
                </View>
            </View>

            <Text style={styles.textBrand}>{article.brand}</Text>
            <LinearGradient style={styles.buttonAddCart}
                colors={['#4158d0', '#c850c0', '#ffcc70']}
                start={{ y: 0.4, x: 0.9 }}
                end={{ y: 0.2, x: 0 }}
            >
                <Button
                    type="clear"
                    title="Add to cart"
                    onPress={buy}
                    buttonStyle={{ width: '100%', height: '100%' }}
                    titleStyle={{ fontFamily: 'Montserrat_700Bold', color: 'white' }}

                />
            </LinearGradient>
            <View>
                <Text style={styles.titleDescripcion}>Description</Text>
                <Text style={styles.textDescripcion}>{article.description}</Text>
            </View>
            <Text style={styles.titleDescripcion}>Payment methods</Text>
            <View style={styles.containerCards}>
                {imgCard.map((card, index) => <Image style={styles.cardImage} key={index} source={{ uri: card }} />)}

            </View>
            <View>
                <Text style={styles.titleDescripcion}>Reviews product</Text>
                <Comments
                    renderComment={renderComment}
                    idArticle={article._id}
                    setRenderComment={setRenderComment}
                />
            </View>
            <View>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#e83e8c', '#6f42c1']}
                    style={styles.background}
                    locations={[0.2, 1]}
                    start={{ x: 0.1, y: 0.2 }}
                />
                <View style={styles.containerBlockIcon}>
                    <View style={styles.blockIconAndText}>
                        <Icon
                            raised
                            size={50}
                            type='font-awesome-5' name="truck"
                        />
                        <Text style={styles.titleBlockIcon}>Free Delivery</Text>
                        <Text style={styles.textBlockIcon}>On Orders Over £50</Text>
                    </View>
                    <View style={styles.blockIconAndText}>
                        <Icon
                            raised
                            size={50}
                            colors={[
                                { color: "gold", offset: "0", opacity: "1" },
                                { color: "red", offset: "1", opacity: "1" },
                            ]}
                            type='font-awesome-5' name="box-open"
                        />
                        <Text style={styles.titleBlockIcon}>14 Day Returns</Text>
                        <Text style={styles.textBlockIcon}>T&C's Apply</Text>
                    </View>
                </View>
                <View style={styles.containerBlockIcon}>
                    <View style={styles.blockIconAndText}>
                        <Icon
                            raised
                            size={50}
                            colors={[
                                { color: "gold", offset: "0", opacity: "1" },
                                { color: "red", offset: "1", opacity: "1" },
                            ]}
                            type='font-awesome-5' name="hand-holding-heart"
                        />
                        <Text style={styles.titleBlockIcon}>Hand Picked</Text>
                        <Text style={styles.textBlockIcon}>By Our Team</Text>
                    </View>
                    <View style={styles.blockIconAndText}>
                        <Icon
                            raised
                            size={50}
                            colors={[
                                { color: "gold", offset: "0", opacity: "1" },
                                { color: "red", offset: "1", opacity: "1" },
                            ]}
                            type='font-awesome-5' name="box"
                        />
                        <Text style={styles.titleBlockIcon}>Discreet</Text>
                        <Text style={styles.textBlockIcon} >Non-Identifiable Packaging</Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}
const mapStateToProps = state => {
    return {
        articles: state.cart.articles,
        /*  allProducts: state.productsReducer.allProducts */
    }
}

const mapDispatchToProps = {
    allProducts: cartActions.allProducts,
    buyArticle: cartActions.buyArticle,
    fetchComments: commentsActions.fetchComments,
    products: commentsActions.products,
    deleteComment: commentsActions.deleteComment,
    updateComment: commentsActions.updateComment
}


const styles = StyleSheet.create({
    containerProduct: {
        margin: 10,
        backgroundColor: 'white'
    },
    productName: {
        fontFamily: 'DancingScript_400Regular',
        fontSize: 35
    },
    carousel: {

    },
    image: {
        width: "100%",
        height: 400,
        padding: 20,
        resizeMode: 'contain',
    },
    containerPrecieAndStock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerStock: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStockPrice: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 30,
        marginRight: 10,
        marginLeft: 10
    },
    textStock: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    textPrice: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 40,
        marginTop: 10,
        marginBottom: 10,
    },
    textBrand: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 20,
        marginTop: 10,
    },
    buttonAddCart: {
        marginTop: 30,
        marginBottom: 30,
        height: 50,
        borderRadius: 20
    },
    titleDescripcion: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    textDescripcion: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 20,
        marginTop: 10,
    },
    cardImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    },
    containerCards: {
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    containerBlockIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    blockIconAndText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
    },
    titleBlockIcon: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Montserrat_700Bold',
        color: 'white'
    },
    textBlockIcon: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        padding: 10
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Product)