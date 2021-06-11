import React, { useState } from "react"
import { connect } from "react-redux";
import productsActions from "../redux/Action/productsActions"
import { CreditCardInput } from "react-native-credit-card-input";
import { StyleSheet, ScrollView, View, Text, ToastAndroid } from "react-native"
import { Button } from "react-native-elements"
import Toast from 'react-native-toast-message';
import PaypalButton from "../Components/Cart/paypalButton"

const CreditCard = ({ navigation, route:{ params }, sendEmail })=>{
    const [ creditCard, setCreditCard ] = useState()

    return <>
        <ScrollView  >

            <View style={styles.mainContainer}>

                <CreditCardInput onChange={ object =>setCreditCard({ ...object, values:{ ...object.values, cardBrand: object.values.type }}) } />
    {/* sdasd */}
                <View >
                    <Button
                        title="Pay"
                        buttonStyle={styles.payButton}
                        onPress={() =>{
                            creditCard && creditCard.status 
                            ? sendEmail( params.form, creditCard.values,{ cartArticles:params.cart , total:params.total })
                            .then( res => navigation.navigate("PaymentSuccessFull") ) 
                            : Toast.show({
                                text1: 'Something are wrong',
                                type: 'error',
                                position: 'bottom',
                            })
                        }}/>
                </View>

                <View>
                    <PaypalButton />
                </View>


            </View>


        </ScrollView>

        <View style={styles.totalCotainer}>
            <Text style={styles.textTotal}>Total to pay</Text>
            <Text style={styles.textTotal}>€ { params.total }</Text>
        </View>
    </>

}

const mapDispatchToProps ={
    sendEmail: productsActions.sendMail
}

export default connect(null, mapDispatchToProps) (CreditCard)

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        margin: "1%",
        marginTop: "4%",
        justifyContent: "space-between",
    },
    totalCotainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4%",
        backgroundColor: "#F1ECEB"
    },
    textTotal:{
        fontSize:17
    },
    payButton: {
        margin: "3%",
        marginTop: "5%",
    }
})